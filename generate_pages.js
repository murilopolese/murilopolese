// 3rd party modules
const fs = require('fs')
const path = require('path')
const prettify = require('html-prettify')
const matter = require('gray-matter')

// Templates
const pageTemplate = require('./templates/page.js')
const postTemplate = require('./templates/post.js')
const homeTemplate = require('./templates/home.js')
const listTemplate = require('./templates/list.js')

function generateFrontMatter(content) {
  content.matter = matter(content.filecontent)
  return content
}

function generatePostHTML(content) {
  content.html = postTemplate(content)
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
  if (process.env.PROCESS_IMAGES) {
    await processImages()
  }

  // Local modules and helpers
  const listFiles = require('./templates/utils/listfiles.js')


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

  // Step 4: Get related content
  posts.blog = posts.blog.map((content, i) => {
    const next = posts.blog[(i+1) % posts.blog.length]
    const prev = posts.blog[(posts.blog.length+i-1) % posts.blog.length]
    content.related = [prev, next]
    return content
  })
  posts.project = posts.project.map((content, i) => {
    const next = posts.project[(i+1) % posts.project.length]
    const prev = posts.project[(posts.project.length+i-1) % posts.project.length]
    content.related = [prev, next]
    return content
  })
  posts.workshop = posts.workshop.map((content, i) => {
    const next = posts.workshop[(i+1) % posts.workshop.length]
    const prev = posts.workshop[(posts.workshop.length+i-1) % posts.workshop.length]
    content.related = [prev, next]
    return content
  })

  // Step 5: generate html
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
  posts.blog = posts.blog.map(generatePostHTML)
  posts.project = posts.project.map(generatePostHTML)
  posts.workshop = posts.workshop.map(generatePostHTML)

  // Step 6: write files to the correct path
  pages.forEach(writeFile)
  posts.blog.forEach(writeFile)
  posts.project.forEach(writeFile)
  posts.workshop.forEach(writeFile)
}

main()
