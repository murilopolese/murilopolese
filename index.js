const moveFolder = require('./src/moveFolder.js')
const cleanBuildFolder = require('./src/cleanBuildFolder.js')
const parseMarkdown = require('./src/parseMarkdown.js')
const getAllPosts = require('./src/getAllPosts.js')
const createPage = require('./src/createPage.js')
const createIndex = require('./src/createIndex.js')
const makeURL = require('./src/makeURL.js')

const processImages = require('./src/processImages.js')

function getPrevious(array, category, i) {
  const previous = array[(array.length + i - 1) % array.length]
  return {
    filePath: `./content/${category}/${previous.fileName}`,
    url: makeURL(category, previous.fileName)
  }
}

function getNext(array, category, i) {
  const next = array[(i + 1) % array.length]
  return {
    filePath: `./content/${category}/${next.fileName}`,
    url: makeURL(category, next.fileName)
  }
}

cleanBuildFolder()
.then(function() { return processImages('./media', './processed_media') })
.then(function() { return moveFolder('./processed_media', './build') })
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
  allProjects.forEach(function(project, i) {
    const url = makeURL('projects', project.fileName)
    const previous = getPrevious(allProjects, 'projects', i)
    const next = getNext(allProjects, 'projects', i)
    createPage(`./content/projects/${project.fileName}`, url, previous, next)
  })
  allBlogs.forEach(function(blog, i) {
    const url = makeURL('blog', blog.fileName)
    const previous = getPrevious(allBlogs, 'blog', i)
    const next = getNext(allBlogs, 'blog', i)
    createPage(`./content/blog/${blog.fileName}`, url, previous, next)
  })
  allWorkshops.forEach(function(workshop, i) {
    const url = makeURL('workshops', workshop.fileName)
    const previous = getPrevious(allWorkshops, 'workshops', i)
    const next = getNext(allWorkshops, 'workshops', i)
    createPage(`./content/workshops/${workshop.fileName}`, url, previous, next)
  })
})
.catch(function(error) {
  console.log('error', error)
})
