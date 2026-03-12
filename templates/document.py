
def template(state={}):
    trackAllScript = ""
    if "trackAll" in state.keys():
        trackAllScript = """
const allLinks = document.querySelectorAll('main a')
Array.from(allLinks).forEach((trigger, i) => {{
  trigger.addEventListener('click', () => {{
    umami.track('link-'+trigger.href.slice(0,40))
  }})
}})
"""
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
    <script defer src="https://x9.box.bananabanana.me/script.js" data-website-id="feaf0f2b-4ee2-4152-bcb0-0ba737cab103"></script>
  </head>
    <body>
        <nav>
            <h1><a href="/">Murilo Polese</a></h1>
            <div class="categories">
                <a href="/about.html">About</a>
                <a href="/projects.html">Developer</a>
                <a href="/learning.html">Educator</a>
                <a data-umami-event="link-bananabanana" target="_blank" href="http://bananabanana.me">🍌🍌</a>
            </div>
        </nav>
        <main>
            {main}
        </main>
        <script type="text/javascript">
          const triggers = document.querySelectorAll('*[data-umami-event]')
          Array.from(triggers).forEach((trigger, i) => {{
            trigger.addEventListener('click', () => {{
              umami.track(trigger.dataset['umamiEvent'])
            }})
          }})
          {trackAllScript}
        </script>
    </body>
</html>
    """.format(
        main=state['main'],
        trackAllScript=trackAllScript
    )
