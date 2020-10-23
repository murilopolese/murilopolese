const renderHead = require('./head')
const renderMenu = require('./menu')

function renderPageLayout(data) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      ${renderHead(data)}
      <body>
        <div class="container">
          ${renderMenu()}
          ${data.html}
        </div>
      </body>
    </html>
  `
}

module.exports = renderPageLayout;
