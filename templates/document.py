
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
    <script src="./static/gallery.js"></script>
    <link rel="shortcut icon" href="./static/favicon.ico">
    <script>
      /*to prevent Firefox FOUC, this must be here*/
      let FF_FOUC_FIX;
    </script>
  </head>
    <body>
        <nav>
            <h1><a href="/">Murilo Polese</a></h1>
            <div class="categories">
                <a href="/about.html">About</a>
                <a href="/projects.html">Developer</a>
                <a href="/learning.html">Educator</a>
                <!-- <a target="_blank" href="http://bananabanana.me">🍌🍌</a> -->
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
