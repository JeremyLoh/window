import domToImage from "dom-to-image"
import { saveAs } from "file-saver"

export async function downloadDomElement(element: HTMLDivElement, filename: string) {
  if (element == null) {
    return
  }
  const options = getDownloadOptions(element.clientWidth, element.clientHeight)
  const blob = await domToImage.toBlob(element, options)
  if (window.saveAs) {
    window.saveAs(blob, `${filename}.png`)
  } else {
    saveAs(blob, `${filename}.png`)
  }
}

function getDownloadOptions(width: number, height: number) {
  const scale = 2
  return {
    bgcolor: "#fff",
    width: width * scale,
    height: height * scale,
    style: {
      transform: "scale(" + scale + ")",
      transformOrigin: "top left"
    }
  }
}