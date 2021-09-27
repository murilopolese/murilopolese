const markdown = require('./utils/markdown.js')
const documentTemplate = require('./components/document.js')
const headerTemplate = require('./components/header.js')
const listTemplate = require('./components/list.js')

module.exports = function(post) {
  const header = headerTemplate()
  const postContent = markdown(post.matter.content)
  const { title, description } = post.matter.data
  const related = post.related

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
            ${postContent}
          </div>
          <div class="related">
            <h3>Related</h3>
            ${listTemplate(related)}
          </div>
        </div>
      </div>
    `
  })
}
