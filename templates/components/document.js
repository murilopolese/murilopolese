function mainTemplate(state) {
  const { title, content } = state
  return `
    <!DOCTYPE html>
    <html lang="en" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>Murilo Polese - ${title}</title>
        <link rel="stylesheet" href="/reset.css">
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        ${content}
        <script src="/lazyimage.js" type="text/javascript"></script>
      </body>
    </html>
  `
}

module.exports = mainTemplate
