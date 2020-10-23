const path = require('path')
const fs = require('fs')
const remove = require('rimraf')

function cleanBuildFolder() {
  let buildPath = path.resolve('./build')
  return new Promise(function(resolve, reject) {
    remove(buildPath, function(err) {
      fs.mkdirSync(buildPath, { recursive: true })
      if (err) return reject(err)
      resolve()
    })
  })
}

module.exports = cleanBuildFolder;
