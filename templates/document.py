
def template(state={}):
    return """
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Murilo Polese</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="./static/reset.css">
    <link rel="stylesheet" href="./static/style.css">
  </head>
    <body>
        <nav>
            <h1><a href="/">Murilo Polese</a></h1>
            <div class="categories">
                <a href="/about.html">About</a>
                <a href="/projects.html">Projects</a>
                <a href="/learning.html">Learning</a>
                <a href="/bananabanana.html">🍌🍌</a>
            </div>
        </nav>
        <main>
            {main}
        </main>
    </body>
</html>
    """.format(
        main=state['main']
    )
