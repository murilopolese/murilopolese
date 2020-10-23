const path = require('path')
const fs = require('fs')
const parseMarkdown = require('./parseMarkdown.js')
const pageLayout = require('./templates/page.js')

function createPage(contentPath, pagePath) {
  let resolvedContentPath = path.resolve(contentPath)
  let resolvedPagePath = path.resolve('./build', pagePath)

  let homePageData = parseMarkdown(resolvedContentPath)
  let html = pageLayout(homePageData)

  fs.mkdirSync(resolvedPagePath, { recursive: true })
  fs.writeFileSync(`${resolvedPagePath}/index.html`, html)
}

module.exports = createPage;
