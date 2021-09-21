// 3rd party modules
const fs = require('fs')
const path = require('path')
const prettify = require('html-prettify')
const matter = require('gray-matter')

function generateFrontMatter(content) {
  content.matter = matter(content.filecontent)
  return content
}



function writeFile(content) {
  console.log('writting', content.matter.data.path)
  // Create folder for clean paths
  fs.mkdirSync(
    path.resolve(
      './public',
      content.matter.data.path.substring(1)
    ),
    { recursive: true }
  )
  // Write index inside folder
  fs.writeFileSync(
    path.resolve(
      './public',
      content.matter.data.path.substring(1),
      'index.html'
    ),
    prettify(content.html)
  )
}


async function main() {
  // Step 1: process images
  const processImages = require('./process_images.js')
  // await processImages()

  // Local modules and helpers
  const listFiles = require('./templates/utils/listfiles.js')
  // Templates
  const pageTemplate = require('./templates/page.js')
  const homeTemplate = require('./templates/home.js')
  const listTemplate = require('./templates/list.js')

  function generateHTML(content) {
    content.html = pageTemplate(content)
    return content
  }

  // Step 2: move static files
  const staticSrc = './static'
  const staticFiles = listFiles(path.resolve(staticSrc))
  staticFiles.forEach((file) => {
    fs.copyFileSync(
      path.resolve(staticSrc, file),
      path.resolve('./public', file)
    )
  })

  // Step 3: get content
  // File paths
  let pages = fs.readdirSync(path.resolve('./content', 'pages'))
  let posts = {
    blog: fs.readdirSync(path.resolve('./content', 'blog')),
    project: fs.readdirSync(path.resolve('./content', 'projects')),
    workshop: fs.readdirSync(path.resolve('./content', 'workshops'))
  }
  // File contents
  pages = pages.map((fileName) => {
    return {
      filename: fileName,
      filecontent: fs.readFileSync(
        path.resolve('./content', 'pages', fileName)
      ).toString()
    }
  })
  posts.blog = posts.blog.map((fileName) => {
    return {
      filename: fileName,
      filecontent: fs.readFileSync(
        path.resolve('./content', 'blog', fileName)
      ).toString()
    }
  })
  posts.project = posts.project.map((fileName) => {
    return {
      filename: fileName,
      filecontent: fs.readFileSync(
        path.resolve('./content', 'projects', fileName)
      ).toString()
    }
  })
  posts.workshop = posts.workshop.map((fileName) => {
    return {
      filename: fileName,
      filecontent: fs.readFileSync(
        path.resolve('./content', 'workshops', fileName)
      ).toString()
    }
  })
  // Front matter
  pages = pages.map(generateFrontMatter)
  posts.blog = posts.blog.map(generateFrontMatter)
  posts.project = posts.project.map(generateFrontMatter)
  posts.workshop = posts.workshop.map(generateFrontMatter)

  // Step 4: generate html
  pages = pages.map((page) => {
    // Generate pages according to its template
    switch (page.matter.data.template) {
      case 'list':
        const category = page.matter.data.category
        page.html = listTemplate(page, posts[category].reverse())
        break
      case 'home':
        page.html = homeTemplate(page)
        break
      case 'page':
      default:
        page.html = pageTemplate(page)
        break
    }
    return page
  })
  posts.blog = posts.blog.map(generateHTML)
  posts.project = posts.project.map(generateHTML)
  posts.workshop = posts.workshop.map(generateHTML)

  // Step 5: write files to the correct path
  pages.forEach(writeFile)
  posts.blog.forEach(writeFile)
  posts.project.forEach(writeFile)
  posts.workshop.forEach(writeFile)
}

main()
