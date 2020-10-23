const renderHead = require('./head')
const renderMenu = require('./menu')
const makeURL = require('../makeURL.js')

function renderThumbnails(pagePath, posts) {
  return `
    <div class="list">
      ${posts.map(function(post) {
        const url = makeURL(pagePath, post.fileName)
        return `
          <div class="thumbnail">
            <h3><a href="/${url}">${post.title}</a></h3>
            <p><a href="/${url}"><img src="${post.cover}" alt="${post.title}" /></a></p>
            <p>${post.excerpt}</p>
          </div>
        `
      }).join('')}
    </div>
  `
}

function renderListLayout(data, pagePath, posts) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      ${renderHead(data)}
      <body>
        <div class="container">
          ${renderMenu()}
          ${data.html}
          ${renderThumbnails(pagePath, posts)}
        </div>
      </body>
    </html>
  `
}

module.exports = renderListLayout;
