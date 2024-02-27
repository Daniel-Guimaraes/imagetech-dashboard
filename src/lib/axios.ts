import axios, { AxiosError } from 'axios'

import { env } from '@/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
})

api.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  },
)
