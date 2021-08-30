const path = require('path')
const sharp = require('sharp')

const fileOut = path.resolve(process.env.FILE_OUT)

function resize(fileScr, size, file) {
  if (file.indexOf('.gif') !== -1) return Promise.resolve()
  let finalName = file
  if (file[0] === '.') finalName = file.substr(2)
  return sharp(path.resolve(fileScr, file))
    .resize(size)
    .jpeg({ mozjpeg: true })
    .toFile(
      path.resolve(
        fileOut,
        `${size}`,
        finalName
          .split('/').join('_')
          .replace('png', 'jpeg')
      )
    )
    .then(() => console.log('Processed', size, file))
}

module.exports = resize
