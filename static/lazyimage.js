window.onload = function() {
  const images = document.querySelectorAll('.image-wrapper')
  for (let i = 0; i < images.length; i++) {
    const image = images.item(i)
    if (!image.dataset['small']) continue
    fetch(image.dataset['small'])
      .then(r => r.arrayBuffer())
      .then(() => {
        let img = new Image()
        img.onload = () => {
          image.appendChild(img)
          setTimeout(() => {
            img.classList.remove('hidden')
            setTimeout(() => {
              img.style.position = 'relative'
              image.querySelector('svg').remove()
            }, 1000)
          }, 100)
        }
        img.style.position = 'absolute'
        img.style.top = '0px'
        img.style.left = '0px'
        img.classList.add('hidden')
        if (image.getBoundingClientRect().width < 420) {
          img.src = `/${image.dataset['small']}`
        } else {
          img.src = `/${image.dataset['big']}`
        }
      })
  }
}
