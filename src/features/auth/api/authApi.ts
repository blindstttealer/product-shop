import { AxiosRequestConfig } from "axios";
import { ProductResponse } from "../../products/api/productsApi.types";
import { apiService } from "../../../api/services";

interface AuthenticationResponse  {
  user: {
    id: string;
    email: string;
    userName: string;
  };
  token: {
    accessToken: string;
    refreshToken: string;
  };
  meta?: {
    ip: string;
    userAgent: string;
  };
}

interface RefreshRequestBody {
  refreshToken: string;
}

export class AuthApi {
  static async registration(
    data?: { email: string; password: string; userName: string },
    config: AxiosRequestConfig = {}
  ): Promise<AuthenticationResponse> {
    return apiService
      .post<any>("http://127.0.0.1:7000/auth/registration", data, {
        ...config,
      })
      .then((response) => response.data);
  }

  static async login(
    data?: { email: string; password: string },
    config: AxiosRequestConfig = {}
  ): Promise<AuthenticationResponse> {
    return apiService
      .post<any>("http://127.0.0.1:7000/auth/login", data, {
        ...config,
      })
      .then((response) => response.data);
  }

  static async logout(config: AxiosRequestConfig = {}): Promise<any> {
    return apiService
      .get<any>("http://127.0.0.1:7000/auth/logout", {
        ...config,
      })
      .then((response) => response.data);
  }

  static async me(
    config: AxiosRequestConfig = {}
  ): Promise<AuthenticationResponse> {
    return apiService
      .get("http://127.0.0.1:7000/auth/me", {
        ...config,
      })
      .then((response) => {

        console.log('response', response)

        return response.data
      });
  }

  static async refresh(
    body: RefreshRequestBody,
    config: AxiosRequestConfig = {}
  ): Promise<any> {
    return apiService
      .post<AuthenticationResponse>(
        "http://127.0.0.1:7000/auth/refresh",
        body, 
        config
      )
      .then((response) => response.data);
  }
}
