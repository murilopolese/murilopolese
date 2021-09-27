const imageTemplate = require('./image.js')
const getDate = require('../utils/getdate.js')

module.exports = function(posts) {
  if (!posts) return ``
  function item(post) {
    const { title, cover, description, path } = post.matter.data
    const date = getDate(post.filename)
    return `
      <li class="item">
        <a class="thumbnail" href="${path}">
          ${imageTemplate(`.${cover}`)}
        </a>
        <div class="details">
          <h4>
            <a href="${path}">
              ${date[0]}-${date[1]}: ${title}
            </a>
          </h4>
          <p>${description}</p>
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
