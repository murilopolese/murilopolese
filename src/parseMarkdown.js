const fs = require('fs')
const path = require('path')
const frontmatter = require('front-matter')
const marked = require('marked')

function parseMarkdown(filePath) {
  let resolvedPath = path.resolve(filePath)
  let file = fs.readFileSync(resolvedPath, 'utf-8')
  let data = frontmatter(file)
  let outPath = filePath.split('/')
  outPath = outPath[outPath.length-1]
  outPath = outPath.split('.')[0]
  return {
    path: outPath,
    title: data.attributes.title,
    description: data.attributes.description,
    excerpt: data.attributes.excerpt,
    thumbnail: data.attributes.thumbnail,
    cover: data.attributes.cover,
    type: data.attributes.type,
    tags: data.attributes.tags,
    html: marked(data.body)
  }
}

module.exports = parseMarkdown;
