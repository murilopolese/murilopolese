const path = require('path')
const fs = require('fs')
const potrace = require('potrace')

const fileOut = path.resolve(process.env.FILE_OUT)
const smallPath = path.resolve(process.env.PATH_SMALL)

function traceSVG(file) {
  let finalName = file
  if (file[0] === '.') finalName = file.substr(1)
  return new Promise((resolve, reject) => {
    potrace.trace(
      path.resolve(smallPath, file),
      {
        background: 'white',
        color: '#ddd',
        threshold: 100
      },
      (err, svg) => {
        fs.writeFileSync(
          path.resolve(
            fileOut,
            'svg',
            finalName.substr(1)
              .split('/').join('_')
              .replace('jpg', 'svg')
              .replace('jpeg', 'svg')
          ),
          svg
        )
        console.log('Traced', file)
        resolve(svg)
      })
    })
}

module.exports = traceSVG
