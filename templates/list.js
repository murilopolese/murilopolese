const markdown = require('./utils/markdown.js')
const documentTemplate = require('./components/document.js')
const headerTemplate = require('./components/header.js')
const listTemplate = require('./components/list.js')

module.exports = function(page, posts) {
  const header = headerTemplate()
  const pageContent = markdown(page.matter.content)
  const { title, description } = page.matter.data

  function filterItem(filter) {
    return `<a href="#${filter}">${filter}</a>`
  }

  return documentTemplate({
    title: page.matter.data.title,
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
          <div class="filter">
            ${page.filters.map(filterItem).join('')}
          </div>
          <div class="content">
            ${pageContent}
            ${listTemplate(posts)}
          </div>
        </div>
      </div>
    `
  })
}
