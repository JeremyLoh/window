import domToImage from "dom-to-image"

export async function downloadDomElement(element: HTMLDivElement, filename: string) {
  if (element == null) {
    return
  }
  const options = getDownloadOptions(element.clientWidth, element.clientHeight)
  const png = await domToImage.toPng(element, options)
  const link = document.createElement("a")
  link.download = `${filename}.png`
  link.href = png
  link.click()
}

function getDownloadOptions(width: number, height: number) {
  const scale = 2
  return {
    cacheBust: false,
    bgcolor: "#fff",
    width: width * scale,
    height: height * scale,
    style: {
      transform: "scale(" + scale + ")",
      transformOrigin: "top left"
    }
  }
}