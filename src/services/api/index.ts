import { AUTH } from '@/consts';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';

export enum AvailableOrigins {
  DevelopmentBackendURL = 'http://localhost:8080',
  ProductionBackendURL = '',
}

class Api {
  private createApiEngine = () => {
    const apiEngine = axios.create({
      baseURL: AvailableOrigins.DevelopmentBackendURL,
    });

    return {
      get: apiEngine.get,
      post: apiEngine.post,
      delete: apiEngine.delete,
      put: apiEngine.put,
    };
  };

  private apiEngine = this.createApiEngine();

  public get = <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return this.apiEngine.get<T>(url, { ...config, ...this.getHeaders(config?.headers) });
  };

  public post = <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return this.apiEngine.post<T>(url, data, { ...config, ...this.getHeaders(config?.headers) });
  };

  public put = <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return this.apiEngine.put<T>(url, data, { ...config, ...this.getHeaders(config?.headers) });
  };

  public delete = <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return this.apiEngine.delete<T>(url, { ...config, ...this.getHeaders(config?.headers) });
  };

  private getHeaders = (headers: Record<string, unknown> = {}) => {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${AUTH}`,
        ...headers,
      },
    };
  };
}

export const isRequestError = (error: unknown): error is AxiosError => {
  return axios.isAxiosError(error);
};

export const getCancelTokenSource = (): CancelTokenSource => {
  return axios.CancelToken.source();
};

export const isRequestCancelled = (error: unknown): boolean => {
  return axios.isCancel(error);
};

export type { CancelToken } from 'axios';
export default new Api();
