function resizeIframes() {
  const ratio = 9 / 16
  let iframes = document.querySelectorAll('iframe')
  for(let i = 0; i < frames.length; i++) {
    let iframe = iframes.item(i)
    if (iframe.parentElement) {
      iframe.width = iframe.parentElement.offsetWidth - 64
      iframe.height = iframe.width * ratio
    }
  }
}
window.onload = function() {
  resizeIframes()
}

window.onresize = function() {
  resizeIframes()
}
