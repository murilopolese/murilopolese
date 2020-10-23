const fs = require('fs')
const path = require('path')
const parseMarkdown = require('./parseMarkdown.js')
const listLayout = require('./templates/list.js')

function createIndex(contentPath, pagePath, posts) {
  let resolvedContentPath = path.resolve(contentPath)
  let resolvedPagePath = path.resolve('./build', pagePath)

  let pageData = parseMarkdown(resolvedContentPath)
  let html = listLayout(pageData, pagePath, posts)

  fs.mkdirSync(resolvedPagePath, { recursive: true })
  fs.writeFileSync(`${resolvedPagePath}/index.html`, html)
}

module.exports = createIndex;
