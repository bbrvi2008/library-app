import axios, { AxiosRequestConfig } from 'axios'
import { 
  logout,
  userSelectors,
} from 'features/User/UserSlice'
import { AppStore } from './store'
import { message } from 'antd'

export const rootBackendUrl = process.env.REACT_APP_ROOT_BACKEND_URL

const axiosInstance = axios.create({
  baseURL: rootBackendUrl,
})

export const interceptors = (store: AppStore) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = userSelectors.selectToken(store.getState())
      if (token) {
        config.headers = { ...config.headers, Authorization: `Bearer ${token}` }
      }
      return config
    },
    (error) => {
      console.log(error)
    },
  )
  
  axiosInstance.interceptors.response.use(
    (axiosResponse) => axiosResponse.data,
    (error) => {
      if (error.response.status === 401) {
        message.error('Требуется выполнить вход')
        store.dispatch(logout())
      } else if (error.response.status === 400) {
        const errorMessage = error.response.data?.message || 'Произошла непредвиденная ошибка'
        message.error(errorMessage)
      } else {
        message.error('Произошла непредвиденная ошибка')
      }

      return Promise.reject(error.response.data)
    },
  )
}

/**
 * @description Обертка над http-клиентом. Должна использоваться при любых запросах
 *  Использование http-клиента напрямую запрещено.
 */
class Http {
  public static get<T>(
    url: string,
    params?: Record<string, any>,
    config?: Omit<AxiosRequestConfig, 'params'>,
  ): Promise<ResponseDto<T>> {
    return axiosInstance.get(url, {
      ...config,
      params,
    })
  }

  public static post<T>(
    url: string,
    body?: any,
    config?: AxiosRequestConfig,
  ): Promise<ResponseDto<T>> {
    return axiosInstance.post(url, body, config)
  }

  public static put<T>(
    url: string,
    body?: any,
    config?: AxiosRequestConfig,
  ): Promise<ResponseDto<T>> {
    return axiosInstance.put(url, body, config)
  }

  public static patch<T>(
    url: string,
    body?: any,
    config?: AxiosRequestConfig,
  ): Promise<ResponseDto<T>> {
    return axiosInstance.patch(url, body)
  }

  public static delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ResponseDto<T>> {
    return axiosInstance.delete(url, config)
  }
}

export type ResponseDto<T> = T

export default Http
