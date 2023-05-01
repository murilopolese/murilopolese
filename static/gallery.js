window.addEventListener('load', () => {
  let images = document.querySelectorAll('.gallery img')
  console.log('images', images)
  if (images) {
    Array.from(images).forEach((image) => {
      image.addEventListener('click', (e) => {
        window.open(e.target.src.replace('thumbnails', 'media'))
      })
    })
  }
})
