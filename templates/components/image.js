const fs = require('fs')
const path = require('path')
const files = require('../../public/files.json')

module.exports = function(href) {
  if (files[href].svg) {
    let svgData = fs.readFileSync(
      path.resolve('./public', files[href].svg)
    ).toString()
    return `
      <div class="image-wrapper"
        data-small="${files[href].small}"
        data-big="${files[href].big}"
        >
        ${svgData}
      </div>
    `
  } else {
    return `
      <img src="/${files[href].big}" />
    `
  }
}
