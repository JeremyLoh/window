import ResizeObserver from "resize-observer-polyfill"
import { afterAll, afterEach, beforeAll, expect, vi } from "vitest"
import { cleanup } from "@testing-library/react"
import matchers from "@testing-library/jest-dom/matchers"
import { enableAllPlugins } from "immer"
import { server } from "./serverSetup"

// Mocking canvas - https://github.com/hustcc/jest-canvas-mock/issues/88
// @ts-expect-error: Global type missing
global.jest = vi
// eslint-disable-next-line import/first
// @ts-ignore
import getCanvasWindow from "jest-canvas-mock/lib/window"

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers)

beforeAll(() => {
  console.error = (error) => {
    throw new Error(error)
  }
  console.warn = (warning) => {
    throw new Error(warning)
  }
  server.listen({ onUnhandledRequest: "error" })
  mockNextFont()
  mockNextImage()
  mockResizeObserver()
  mockCanvas()
  enableAllPlugins()
})

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
  // Reset handlers after each test `important for test isolation`
  server.resetHandlers()
})

afterAll(() => {
  server.close()
  // @ts-expect-error: type
  delete global.jest
  // @ts-expect-error: type
  delete global.window.jest
  vi.restoreAllMocks()
})

function mockNextFont() {
  vi.mock("next/font/google", () => {
    return {
      Special_Elite: vi.fn(() => {
        return {
          className: "className",
          variable: "variable",
          style: { fontFamily: "fontFamily" },
        }
      }),
    }
  })
}

function mockNextImage() {
  vi.mock("next/image")
}

function mockResizeObserver() {
  global.ResizeObserver = ResizeObserver
}

function mockCanvas() {
  const apis = [
    "Path2D",
    "CanvasGradient",
    "CanvasPattern",
    "CanvasRenderingContext2D",
    "DOMMatrix",
    "ImageData",
    "TextMetrics",
    "ImageBitmap",
    "createImageBitmap",
  ] as const
  const canvasWindow = getCanvasWindow({ document: window.document })

  apis.forEach((api) => {
    global[api] = canvasWindow[api]
    global.window[api] = canvasWindow[api]
  })
}
