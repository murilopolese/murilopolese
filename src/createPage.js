const path = require('path')
const fs = require('fs')
const parseMarkdown = require('./parseMarkdown.js')
const pageLayout = require('./templates/page.js')

function createPage( filePath, url, previous, next ) {
  let resolvedContentPath = path.resolve(filePath)
  let resolvedPagePath = path.resolve('./build', url)

  let homePageData = parseMarkdown(resolvedContentPath)
  let prevData = null
  let nextData = null
  if (previous) {
    let resolvedPrevPath = path.resolve(previous.filePath)
    prevData = parseMarkdown(resolvedPrevPath)
    prevData.url = previous.url
  }
  if (next) {
    let resolvedNextPath = path.resolve(next.filePath)
    nextData = parseMarkdown(resolvedNextPath)
    nextData.url = next.url
  }
  let html = pageLayout(homePageData, prevData, nextData)

  fs.mkdirSync(resolvedPagePath, { recursive: true })
  fs.writeFileSync(`${resolvedPagePath}/index.html`, html)
}

module.exports = createPage;
