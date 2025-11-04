import { ApiService } from '../services/api-service';

export class AuthExtensionSimple {
  constructor(private api: ApiService) {
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.api.instance.interceptors.response.use(
      (res) => res,
      (err) => {
        const status = err?.response?.status;
        const message = err?.response?.data?.message;

        if (status === 401 || message === 'bad tokens') {
          console.warn('[AuthExtensionSimple] 401 unauthorized, redirecting to /login...');
          /*Нужно будет авторизацию полностью вынести на отдельные роуты
          Отдельно роут /login, /register, /verification
          Смысл задачи: Научиться работать с существующим кодом, когда появляется необходимость
          от заказчика переделать существующий функционал.
          Переносить будем после того как реализуем полностью функционал авторизации.
          */
          window.location.replace('/login');
        }

        return Promise.reject(err);
      },
    );
  }
}
