const fs = require('fs')
const path = require('path')

const Jimp = require('jimp')

const imageFormats = ['gif', 'jpg', 'jpeg', 'png']

function getImages(src) {
  let resolvedPath = path.resolve(src)
  let files = fs.readdirSync(resolvedPath)
  let images = files.filter(function(file) {
    if (file.indexOf('.') != -1) {
      let extension = file.split('.')
      extension = extension.slice(-1)
      return imageFormats.indexOf(extension[0]) !== -1
    } else {
      return false
    }
  })
  let folders = files.filter(function(file) {
    return file.indexOf('.') === -1
  })
  folders = folders.reduce(function(acc, item) {
    let folderPath = path.resolve(src, item)
    acc[item] = getImages(folderPath)
    return acc
  }, {})
  Object.keys(folders).forEach(function(folder) {
    if (folders[folder] && folders[folder].length) {
      folders[folder].forEach(function(file) {
        images.push(`${folder}/${file}`)
      })
    }
  })
  return images
}

async function resizeImages(images, sourcePath, destinationPath, options) {
  let { width, height, quality, prefix = '' } = options
  return Promise.all(
    images.map(async function(imgPath) {
      if (!fs.existsSync(`${destinationPath}/${prefix}${imgPath}`)) {
        try {
          console.log('processing', imgPath)
          const image = await Jimp.read(`${sourcePath}/${imgPath}`)
          console.log('read', imgPath)
          await image.resize(width, height)
          console.log('resized', imgPath)
          await image.quality(quality)
          console.log('compressed', imgPath)
          await image.writeAsync(`${destinationPath}/${prefix}${imgPath}`)
          console.log('processed', imgPath)
        } catch (err) {
          console.log('error', err)
          return Promise.resolve()
        }
      } else {
        console.log('image already processed', imgPath)
      }
    })
  )
}



function processImages(sourcePath, destinationPath, options) {
  let images = getImages(sourcePath)
  if (!fs.existsSync(path.resolve(destinationPath))) {
    fs.mkdirSync(destinationPath)
  }
  let resizeOptions = {
    width: 1920,
    height: Jimp.AUTO,
    quality: 90
  }
  let thumbOptions = {
    width: 800,
    height: Jimp.AUTO,
    quality: 80,
    prefix: 'thumb_'
  }
  return resizeImages(images, sourcePath, destinationPath, resizeOptions)
    .then(() => resizeImages(images, sourcePath, destinationPath, thumbOptions))
    .catch(function(err) {
      console.log('error', err)
    })
}

module.exports = processImages
