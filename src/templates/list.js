const renderHead = require('./head')
const renderMenu = require('./menu')
const makeURL = require('../makeURL.js')
const getDate = require('../getDate.js')

function renderThumbnails(pagePath, posts) {
  return `
    <div class="list">
      ${posts.map(function(post) {
        const url = makeURL(pagePath, post.fileName)
        const date = getDate(post.fileName)
        let tags = ''
        if (post.tags) {
          tags = post.tags.map(function(tagName) {
            return `tag-${tagName}`
          }).join(' ')
        }
        return `
          <div class="thumbnail ${tags}">
            <h3><a href="/${url}">${date}: ${post.title}</a></h3>
            <p><a href="/${url}"><img src="${post.cover}" alt="${post.title}" /></a></p>
            <p>${post.excerpt}</p>
          </div>
        `
      }).join('')}
    </div>
  `
}

function renderTags(posts) {
  let tags = posts.reduce(function(acc, post) {
    if (post.tags) {
      post.tags.forEach(function(tag) {
        if (acc[tag]) {
          acc[tag]++
        } else {
          acc[tag] = 1
        }
      })
    }
    return acc
  }, {})
  return Object.keys(tags).map(function(tagName) {
    return `
      <button class="tag-button" data-tag=${tagName}>${tagName} (${tags[tagName]})</button>
    `
  }).join('')
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
          <div class="tag-list">
            ${renderTags(posts)}
          </div>
          ${renderThumbnails(pagePath, posts)}
        </div>
      </body>
    </html>
  `
}

module.exports = renderListLayout;
