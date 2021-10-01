function resizeIframes() {
  const ratio = ( 9 / 16 )
  const iframes = document.querySelectorAll('iframe')
  let youtubeIframes = []
  for (let i = 0; i < iframes.length; i++) {
    const iframe = iframes.item(i)
    if (iframe.src.indexOf('youtu') !== -1) {
      youtubeIframes.push(iframe)
    }
  }
  youtubeIframes.forEach((iframe) => {
    let bounds = iframe.getBoundingClientRect()
    let w = bounds.width
    let h = w * ratio
    iframe.width = w
    iframe.height = h
  })
}

window.addEventListener('load', resizeIframes)
window.addEventListener('resize', resizeIframes)
