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
  return new Promise((resolve) => setTimeout(resolve, Math.ceil(timeInSeconds * 1000)))
}