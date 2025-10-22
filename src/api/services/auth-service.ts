import { AuthApi } from "../../features/auth/api/authApi";
import { ApiService } from "./api-service";

export class AuthExtension {
  private isRefreshing = false;
  private failedQueue: {
    resolve: (token: string) => void;
    reject: (err: any) => void;
    originalRequest: any;
  }[] = [];

  constructor(
    private api: ApiService,
    private onAuthError: () => void,
  ) {
    this.setupInterceptors();
  }

  private setupInterceptors() {
    // добавляем токен в каждый запрос
    this.api.instance.interceptors.request.use((config) => {
      const raw = localStorage.getItem("accessToken");
      const token = raw ? JSON.parse(raw) : null; // убираем кавычки

      console.log("token", token);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // перехватываем ответы
    this.api.instance.interceptors.response.use(
      (res) => res,
      (err) => this.handle401(err),
    );
  }

  private async handle401(error: any) {
    const originalRequest = error.config;

    // если ошибка не 401 или уже повтор
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (this.isRefreshing) {
      return new Promise((resolve, reject) => {
        this.failedQueue.push({ resolve, reject, originalRequest });
      }).then((token) => {
        // клонируем конфиг запроса с новым токеном
        const newRequest = {
          ...originalRequest,
          headers: {
            ...originalRequest.headers,
            Authorization: `Bearer ${token}`,
          },
        };
        return this.api.instance(newRequest);
      });
    }

    this.isRefreshing = true;

    try {
      const refreshToken = localStorage.getItem("refreshToken") ?? "";
      const data = await AuthApi.refresh({ refreshToken });

      if (!data?.token?.accessToken || !data?.token?.refreshToken) {
        throw new Error("Refresh token failed");
      }

      localStorage.setItem("accessToken", data.token.accessToken);
      localStorage.setItem("refreshToken", data.token.refreshToken);

      // повторяем все запросы в очереди с новым токеном
      this.failedQueue.forEach((p) => {
        p.resolve(data.token.accessToken);
      });
      this.failedQueue = [];

      // повторяем текущий запрос
      const newRequest = {
        ...originalRequest,
        headers: {
          ...originalRequest.headers,
          Authorization: `Bearer ${data.token.accessToken}`,
        },
      };
      return this.api.instance(newRequest);
    } catch (err) {
      this.failedQueue.forEach((p) => p.reject(err));
      this.failedQueue = [];
      this.onAuthError();
      return Promise.reject(err);
    } finally {
      this.isRefreshing = false;
    }
  }
}
