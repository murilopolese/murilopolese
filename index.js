const moveFolder = require('./src/moveFolder.js')
const cleanBuildFolder = require('./src/cleanBuildFolder.js')
const parseMarkdown = require('./src/parseMarkdown.js')
const getAllPosts = require('./src/getAllPosts.js')
const createPage = require('./src/createPage.js')
const createIndex = require('./src/createIndex.js')
const makeURL = require('./src/makeURL.js')

cleanBuildFolder()
.then(function() { return moveFolder('./media', './build') })
.then(function() { return moveFolder('./assets', './build') })
.then(function() {
  // Create single pages
  createPage('./content/pages/home.md', '')
  createPage('./content/pages/cv.md', 'cv')


  let allProjects = getAllPosts('./content/projects')
  allProjects.reverse()
  let allBlogs = getAllPosts('./content/blog')
  allBlogs.reverse()
  let allWorkshops = getAllPosts('./content/workshops')
  allWorkshops.reverse()

  // Create index/list pages
  createIndex('./content/pages/projects.md', 'projects', allProjects)
  createIndex('./content/pages/blog.md', 'blog', allBlogs)
  createIndex('./content/pages/workshops.md', 'workshops', allWorkshops)

  // Create single pages for all posts
  allProjects.forEach(function(project) {
    const url = makeURL('projects', project.fileName)
    createPage(`./content/projects/${project.fileName}`, url)
  })
  allBlogs.forEach(function(blog) {
    const url = makeURL('blog', blog.fileName)
    createPage(`./content/blog/${blog.fileName}`, url)
  })
  allWorkshops.forEach(function(workshop) {
    const url = makeURL('workshops', workshop.fileName)
    createPage(`./content/workshops/${workshop.fileName}`, url)
  })
})
.catch(function(error) {
  console.log(error)
})
