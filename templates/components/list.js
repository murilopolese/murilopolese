const imageTemplate = require('./image.js')

module.exports = function(posts) {
  function item(post) {
    const { title, cover, excerpt, path } = post.matter.data
    return `
      <li class="item">
        <a class="thumbnail" href="${path}">
          ${imageTemplate(`.${cover}`)}
        </a>
        <div class="details">
          <h4>
            <a href="${path}">${title}</a>
          </h4>
          <p>${excerpt}</p>
          <a href="${path}">Read more</a>
        </div>
      </li>
    `
  }
  return `
    <ul class="list">
      ${posts.map(item).join('')}
    </ul>
  `
}
