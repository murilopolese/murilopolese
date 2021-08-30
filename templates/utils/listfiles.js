const fs = require('fs')
const path = require('path')
/**
 * Recursively list all files from a folder
 * @param {String} srcPath Root path for folder images
 * @param {String} folderPath Relative path to the folder being scanned
 */
function walk (srcPath, folderPath) {
  if (!srcPath) srcPath = './src'
  if (!folderPath) folderPath = '.'

  const files = fs.readdirSync(
    path.resolve(srcPath, folderPath)
  )

  return files.reduce((acc, file) => {
    if(file[0] === '.') return acc // SKIP DOT FILES
    const stat = fs.statSync(path.resolve(srcPath, folderPath, file))
    if (stat.isDirectory()) {
      acc = acc.concat( walk(srcPath, `${folderPath}/${file}`) )
    } else {
      acc.push( `${folderPath}/${file}` )
    }
    return acc
  }, [])

}

module.exports = walk
