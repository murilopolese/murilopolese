const renderHead = require('./head')
const renderMenu = require('./menu')

function renderPageLayout(data, previous, next) {
  let previousHtml = undefined
  let nextHtml = undefined
  if (previous) {
    previousHtml = `
      <div class="thumbnail">
        <h3><a href="/${previous.url}">${previous.title}</a></h3>
        <p><a href="/${previous.url}"><img src="${previous.cover}" alt="${previous.title}" /></a></p>
        <p>${previous.excerpt}</p>
      </div>
    `
  }
  if (next) {
    nextHtml = `
      <div class="thumbnail">
        <h3><a href="/${next.url}">${next.title}</a></h3>
        <p><a href="/${next.url}"><img src="${next.cover}" alt="${next.title}" /></a></p>
        <p>${next.excerpt}</p>
      </div>
    `
  }
  return `
    <!DOCTYPE html>
    <html lang="en">
      ${renderHead(data)}
      <body>
        <div class="container">
          ${renderMenu()}
          ${data.html}
          <div class="list">
            ${previousHtml ? previousHtml : ''}
            ${nextHtml ? nextHtml : ''}
          </div>
        </div>
      </body>
    </html>
  `
}

module.exports = renderPageLayout;
