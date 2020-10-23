const fs = require('fs')
const path = require('path')
const parseMarkdown = require('./parseMarkdown.js')

function getAllPosts(folderPath) {
  let postFolder = path.resolve(folderPath)
  let files = fs.readdirSync(postFolder)
  files = files.filter(function(file) {
    return file.indexOf('.md') !== -1
  })
  return files.map(function(fileName) {
    let data = parseMarkdown(`${folderPath}/${fileName}`)
    data.fileName = fileName
    return data
  })
}

module.exports = getAllPosts;
