const markdown = require('./utils/markdown.js')
const documentTemplate = require('./components/document.js')
const headerTemplate = require('./components/header.js')

module.exports = function(page) {
  const header = headerTemplate()
  const pageContent = markdown(page.matter.content)
  const { title, description } = page.matter.data

  return documentTemplate({
    title: title,
    content: `
      <div class="container">
        ${header}
        <div class="body">
          <div class="title">
            <h2>${title}</h2>
            <div class="description">
              ${description}
            </div>
          </div>
          <div class="content">
            ${pageContent}
          </div>
        </div>
      </div>
    `
  })
}
