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

function handleTagButtons() {
  let tagButtons = document.querySelectorAll('.tag-button')
  tagButtons.forEach(function(button) {
    button.addEventListener('click', function(e) {
      let b = e.target
      let tag = b.attributes['data-tag'] ? b.attributes['data-tag'].value : null
      if (b.classList.contains('selected')) {
        button.classList.remove('selected')
        filterContent(null)
      } else {
        tagButtons.forEach(function(button) {
          button.classList.remove('selected')
        })
        b.classList.add('selected')
        filterContent(tag)
      }
    })
  })
}

function filterContent(tag) {
  let listItems = document.querySelectorAll('.thumbnail')
  listItems.forEach(function(item) {
    if (!tag) {
      item.classList.remove('hidden')
    } else if (item.classList.contains(`tag-${tag}`)) {
      item.classList.remove('hidden')
    } else {
      item.classList.add('hidden')
    }
  })
}

window.onload = function() {
  resizeIframes()
  handleTagButtons()
}

window.onresize = function() {
  resizeIframes()
}
