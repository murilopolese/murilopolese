function makeTitle(category, fileName) {
  let title = fileName
  title = title.split('.')[0] // split filename and get string before extension
  title = title.split('-') // split name into array
  title.splice(2, 1) // remove day of name
  title = title.join('-') // join name back
  return `${category}/${title}`
}
module.exports = makeTitle;
