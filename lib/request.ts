import axios, { AxiosResponse } from "axios"

export function debounce(callback: (args: any) => any, delay = 1000) {
  let timeout: NodeJS.Timeout
  return (args: any) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      // @ts-ignore
      callback(...args)
    }, delay)
  }
}

export const sleep = (timeInSeconds: number) => {
  return new Promise((resolve) =>
    setTimeout(resolve, Math.ceil(timeInSeconds * 1000))
  )
}

export type HttpResponse<T = any> = {
  data: T
  status: number
  statusText: string
}

export class HttpRequest {
  static async get(url: string): Promise<HttpResponse> {
    const response: AxiosResponse = await axios.get(url)
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    }
  }
}
