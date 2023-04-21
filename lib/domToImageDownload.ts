import domToImage from "dom-to-image"
import { saveAs } from "file-saver"

export async function downloadDomElement(element: HTMLDivElement, filename: string) {
  if (element == null) {
    return
  }
  const options = getDownloadOptions(element.clientWidth, element.clientHeight)
  const blob = await domToImage.toBlob(element, options)
  saveAs(blob, `${filename}.png`)
}

function getDownloadOptions(width: number, height: number) {
  const scale = 2
  const {adjustedWidth, adjustedHeight} = getAdjustedDimensions(width, height, scale)
  return {
    type: "image/x-png",
    cacheBust: false,
    bgcolor: "#fff",
    width: adjustedWidth,
    height: adjustedHeight,
    style: {
      transform: "scale(" + scale + ")",
      transformOrigin: "top left"
    }
  }
}

function getAdjustedDimensions(width: number, height: number, scale: number) {
  // detect mobile vs desktop, image download is limited by size (width x height)
  const isLongPicture = height > (10 * width)
  return {
    adjustedWidth: (width * scale),
    adjustedHeight: isLongPicture ? height: (height * scale),
  }
}