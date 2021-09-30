const fs = require('fs')
const path = require('path')
const markdown = require('marked')
const imageTemplate = require('../components/image.js')

const renderer = {
  image(href, title, text) {
    const files = require('../../public/files.json')
    if (href.indexOf('://') === -1) {
      // prepend a "dot" if it's a root image
      if (href[0] === '/') href = `.${href}`
      if (files[href]) {
        return imageTemplate(href)
      }
    } else {
      // External image
      return `<img src="${href}" alt="External Image"/>`
    }
  },
  code(string) {
    if (string) {
      return `<div class="code">${string.replace(/\n/g, '<br>')}</div>`
    } else {
      return ``
    }
  }
}

markdown.use({ renderer })

module.exports = markdown
