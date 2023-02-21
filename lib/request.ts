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

  static async post(url: string, body: object): Promise<HttpResponse> {
    const response: AxiosResponse = await axios.post(url, body)
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    }
  }
}

export class XmlHttpRequest {
  static async get(url: string, params: object): Promise<HttpResponse> {
    return await axios.get(url, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Accept-Encoding": "gzip,deflate,compress",
      },
      params,
    })
  }
}
