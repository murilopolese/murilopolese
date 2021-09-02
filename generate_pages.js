// 3rd party modules
const fs = require('fs')
const path = require('path')
const prettify = require('html-prettify')
const matter = require('gray-matter')

// Local modules and helpers
const processImages = require('./process_images.js')
const listFiles = require('./templates/utils/listfiles.js')
// Templates
const pageTemplate = require('./templates/page.js')
const homeTemplate = require('./templates/home.js')
const listTemplate = require('./templates/list.js')

async function main() {
  // Step 1: process images
  // await processImages()

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
  pages = pages.map((page) => {
    page.matter = matter(page.filecontent)
    return page
  })
  posts.blog = posts.blog.map((blog) => {
    blog.matter = matter(blog.filecontent)
    return blog
  })
  posts.project = posts.project.map((project) => {
    project.matter = matter(project.filecontent)
    return project
  })
  posts.workshop = posts.workshop.map((workshop) => {
    workshop.matter = matter(workshop.filecontent)
    return workshop
  })

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
  posts.blog = posts.blog.map((blog) => {
    blog.html = pageTemplate(blog)
    return blog
  })
  posts.project = posts.project.map((project) => {
    project.html = pageTemplate(project)
    return project
  })
  posts.workshop = posts.workshop.map((workshop) => {
    workshop.html = pageTemplate(workshop)
    return workshop
  })

  // Step 5: write files to the correct path
  pages.forEach((page) => {
    console.log('writting', page.matter.data.path)
    // Create folder for clean paths
    fs.mkdirSync(
      path.resolve(
        './public',
        page.matter.data.path.substring(1)
      ),
      { recursive: true }
    )
    // Write index inside folder
    fs.writeFileSync(
      path.resolve(
        './public',
        page.matter.data.path.substring(1),
        'index.html'
      ),
      prettify(page.html)
    )
  })
  posts.blog = posts.blog.map((blog) => {
    console.log('writting', blog.matter.data.path)
    // Create folder for clean paths
    fs.mkdirSync(
      path.resolve(
        './public',
        blog.matter.data.path.substring(1)
      ),
      { recursive: true }
    )
    // Write index inside folder
    fs.writeFileSync(
      path.resolve(
        './public',
        blog.matter.data.path.substring(1),
        'index.html'
      ),
      prettify(blog.html)
    )
  })
  // posts.project = posts.project.map((project) => {
  //   console.log('writting', project.matter.data.path)
  //   // Create folder for clean paths
  //   fs.mkdirSync(
  //     path.resolve(
  //       './public',
  //       project.matter.data.path.substring(1)
  //     ),
  //     { recursive: true }
  //   )
  //   // Write index inside folder
  //   fs.writeFileSync(
  //     path.resolve(
  //       './public',
  //       project.matter.data.path.substring(1),
  //       'index.html'
  //     ),
  //     prettify(project.html)
  //   )
  // })
  // posts.workshop = posts.workshop.map((workshop) => {
  //   console.log('writting', workshop.matter.data.path)
  //   // Create folder for clean paths
  //   fs.mkdirSync(
  //     path.resolve(
  //       './public',
  //       workshop.matter.data.path.substring(1)
  //     ),
  //     { recursive: true }
  //   )
  //   // Write index inside folder
  //   fs.writeFileSync(
  //     path.resolve(
  //       './public',
  //       workshop.matter.data.path.substring(1),
  //       'index.html'
  //     ),
  //     prettify(workshop.html)
  //   )
  // })
}

main()
