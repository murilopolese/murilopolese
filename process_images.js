require('dotenv').config()

const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const potrace = require('potrace')

const listFiles = require('./templates/utils/listfiles.js')
const resize = require('./templates/utils/resize.js')
const traceSVG = require('./templates/utils/trace.js')

const fileSrc = path.resolve(process.env.FILE_SRC)
const fileOut = path.resolve(process.env.FILE_OUT)
const smallPath = path.resolve(path.resolve(process.env.PATH_SMALL))

// Apply sharp operations:
function resizeOperation() {
  // List all files from `src` directory
  const files = listFiles(fileSrc)
  let promises = []
  // RESIZE 420
  promises = promises.concat(
    files.map((file) => {
      return resize(fileSrc, 420, file)
    })
  )
  // RESIZE 960
  promises = promises.concat(
    files.map((file) => {
      return resize(fileSrc, 960, file)
    })
  )
  return Promise.all(promises)
}

// Trace bitmaps
function traceOperation() {
  const smallFiles = listFiles(smallPath)

  const tracePromises  = smallFiles.map((file) => {
    return traceSVG(file)
  })

  return Promise.all(tracePromises)
}

// Move gifs
function moveGifs() {
  const gifs = listFiles(fileSrc).filter(f => f.indexOf('.gif') !== -1)

  for (let i = 0; i < gifs.length; i++) {
    let gif = gifs[i]
    let finalName = gif
    if (finalName[0] === '.') finalName = finalName.substr(2)
    fs.copyFileSync(
      path.resolve(fileSrc, gif),
      path.resolve(fileOut, 'gif', finalName.split('/').join('_'))
    )
    console.log('Copied', gif)
  }
}

// Generate JSON with mapping from `src` to `out` paths
function dictionaryOperation() {
  const files = listFiles(fileSrc)

  const dictionary = files.reduce((acc, file) => {
    let finalName = file
    if (file[0] === '.') {
      finalName = file.substr(2)
    }
    if (file.indexOf('.gif') !== -1) {
      finalName = finalName.split('/').join('_')
      acc[file] = {
        small: `gif/${finalName}`,
        big: `gif/${finalName}`
        // gifs don't have svg
      }
    } else {
      finalName = finalName.split('/').join('_').replace('png', 'jpeg')
      let svgName = finalName.replace('jpg', 'svg').replace('jpeg', 'svg')
      acc[file] = {
        small: `420/${finalName}`,
        big: `960/${finalName}`,
        svg: `svg/${svgName}`
      }
    }
    return acc
  }, {})

  fs.writeFileSync(
    path.resolve(fileOut, 'files.json'),
    JSON.stringify(dictionary)
  )
}

function main() {
  // Clean output directory
  fs.rmdirSync(fileOut, { recursive: true })
  fs.mkdirSync(fileOut)

  fs.mkdirSync(path.resolve(fileOut, '420'))
  fs.mkdirSync(path.resolve(fileOut, '960'))
  fs.mkdirSync(path.resolve(fileOut, 'svg'))
  fs.mkdirSync(path.resolve(fileOut, 'gif'))

  moveGifs()
  return resizeOperation()
    .then(() => {
      console.log('done resizing')
      return traceOperation()
    })
    .then(() => {
      console.log('done tracing')
      dictionaryOperation()
    })
    .catch((err) => {
      console.log('failed', err)
    })
}

module.exports = main
