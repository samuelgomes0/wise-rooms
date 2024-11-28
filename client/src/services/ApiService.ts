import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { parseCookies } from "nookies";

class ApiService {
  private api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
    });

    this.api.interceptors.request.use((config) => {
      const { "wiserooms.token": token } = parseCookies();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.api.get(url, config);
  }

  async post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.api.post(url, data, config);
  }

  async put<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.api.put(url, data, config);
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.api.delete(url, config);
  }
}

const apiServiceInstance = new ApiService(
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3003"
);

export default apiServiceInstance;
