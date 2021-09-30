function selectFilter(url) {
  const hash = new URL(url).hash
  const filterContainer = document.querySelector('.filter')

  if (!filterContainer || !hash) return

  const filterItems = filterContainer.querySelectorAll('a')
  for (let i = 0; i < filterItems.length; i++) {
    const item = filterItems.item(i)
    let filterHash = new URL(item.href).hash
    if (hash === filterHash) {
      item.classList.add('selected')
      filterPosts(hash.substring(1))
    } else {
      item.classList.remove('selected')
    }
  }
}

function filterPosts(filterName) {
  const posts = document.querySelectorAll('.content .item')
  for (let i = 0; i < posts.length; i++) {
    const post = posts.item(i)
    if (!post.classList.contains(`filter-${filterName}`)) {
      post.style.display = 'none'
    } else {
      post.style.display = 'flex'
    }
  }
}

window.addEventListener('popstate', function(e) {
  selectFilter(e.target.location.href)
})

window.addEventListener('load', function() {
  selectFilter(window.location.href)
})
