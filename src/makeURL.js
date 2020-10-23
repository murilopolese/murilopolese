function makeTitle(category, fileName) {
  let title = fileName
  title = title.split('.')[0]
  title = title.split('-')
  title.splice(2, 1)
  title = title.join('-')
  return `${category}/${title}`
}
module.exports = makeTitle;
