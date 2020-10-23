function renderMenu(data) {
  return `
    <div id="header">
      <div class="title">
        <h1><a href="/">Murilo Polese</a></h1>
      </div>
      <div class="menu">
        <ul>
          <li><a href="/cv">CV</a></li>
          <li><a href="/projects">Projects</a></li>
          <li><a href="/workshops">Workshops</a></li>
          <li><a href="/blog">Blog</a></li>
        </ul>
      </div>
    </div>
  `
}

module.exports = renderMenu;
