const fs = require('fs')
const path = require('path')
const markdown = require('./utils/markdown.js')
const documentTemplate = require('./components/document.js')
const headerTemplate = require('./components/header.js')
const imageTemplate = require('./components/image.js')

module.exports = function(page) {
  const header = headerTemplate()
  const pageContent = markdown(page.matter.content)

  return documentTemplate({
    title: page.matter.data.title,
    content: `
      <div class="container">
        ${header}
        <div class="home">
          <div class="text">
            ${pageContent}
          </div>
          <div class="avatar">
            ${imageTemplate(`.${page.matter.data.cover}`)}
          </div>
        </div>
      </div>
    `
  })
}
