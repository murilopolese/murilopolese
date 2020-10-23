const path = require('path')
const copyFolder = require('ncp')

function moveFolder(from, to) {
  let fromPath = path.resolve(from)
  let toPath = path.resolve(to)
  return new Promise(function(resolve, reject) {
    copyFolder(fromPath, toPath, function(err) {
      if (err) return reject(err)
      resolve()
    })
  })
}

module.exports = moveFolder;
