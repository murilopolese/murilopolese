function getDate(fileName) {
  let date = fileName.split('.')[0]
  date = date.split('-')
  date = date.slice(0, 2)
  return date.join('-')
}

module.exports = getDate
