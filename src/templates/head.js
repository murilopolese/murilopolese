function renderHead(data) {
  let title = 'Murilo Polese'
  if (data.title) {
    title += ` - ${data.title}`
  }
  let description = data.description || 'My personal website'
  let thumbnail = data.thumbnail || '/murilism.jpg'
  return `
    <head>
      <title>${title}</title>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      <meta name="description" content="${description}"/>
      <meta property="og:title" content="${title}"/>
      <meta property="og:description" content="${description}"/>
      <meta property="og:image" content="${thumbnail}"/>
      <meta property="og:type" content="website"/>
      <meta name="twitter:card" content="${description}"/>
      <meta name="twitter:creator" content="@murilopolese"/>
      <meta name="twitter:title" content="${title}"/>
      <meta name="twitter:description" content="${description}"/>
      <meta property="twitter:image" content="${thumbnail}"/>
      <script async="" defer="" data-website-id="981e504f-9b11-4611-b323-3acddfde0c08" src="http://umami.bananabanana.me/umami.js"></script>
      <link rel="icon" type="image/png" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAACACAYAAADTcu1SAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAA8JJREFUeJzt3c2OTEEYh/GnuwfDBdggjghbGwur2bKwcAVsXYTEKxE7KzcgYmlhiUlk2OIGZlWTSCQSBAvfGYueTib0VHWfc6qr3p7/L3mDmD5VXc989IkBiIiIiIiIiIiIiIiIiOxpEPm9A8DRnR+ljG3gO/B+5+dJI+Aa8BL4ufMgTfn5DDwC1vZOB6eBNxVsVhOfB8DhafHeVbA5zWyzARyC8afMEbAOnEG8aIAjwLMB469590vuRlr5DZwdAfeAk4U3I/MbAp8GjF9t6lbBp+dDFM+zE8PSO5BODiqgcwronAI6p4DOKaBzCuhc7oB/Ml9/38sZ8AdwGbiVcQ0hzx93fAcu7VrDMq2z3yfkCPhvPEV0FHCveBNWwZNepgn0eLFUvAmr4IkvywR6utCs8Sasgie/DBPo4SLzxpuwCg7A+wQ6XuA37eJNWAWH4HlC1/vAEXChw+MN3Sd21sd7gnXcg/W0j/02gR4vZtFEaVbBgXibQM8XtGiiNKvgUDxNIMNFLZoozSo4GC8TyHRhiyZKswoOx8MEMl7coonSrIIDqn0CmRewaKI0q+CQap7AAhaxaKI0q+Cgap3AghayaKI0q+CwapzAAhezaKI0q+DAapvAghe0aKI0q+DQappAgUUtmijNKji4WiZQaGGLJkqzCg6vhgkUXNyiidKs8OHVMIHCG7gRb5R0u4JDLBqw5Hdm/wBed3j8KnC+p724VuI9p+23YUysAk8K7b2mCRRYVPEcB1Q8xwEVz3FAxXMcUPEcB1Q8xwEVz3FAxXMcUPEcB1Q8xwEVz3FAxXMcUPEKBlxpceC7/QGuMA7QxirwGLjYYf23LR/bhxXgWMH1ge7vBdZy3T4+8kLLtfvSUPgjkJ4uZHM+8b4+bYY51+1bw5IEnCdin1/zwoxr5tKwRAFnidj3C5aQWC+3hiULGIuY49VmiJ9vdg1LGHBaxFy3CmGWU86oYUkD7o6Y8z4vzH7WWTQUDtj1PjDmJuP7pPO0v89LWWF8iKUcL7g2MP4PILdLb0Ja29I/ueycAjqngM4poHMK6JwCOqeAzimgcwronAI6p4DOKaBzCuicAjqngM4poHMK6JwCOqeAzimgcwronAI6p4C+bSugb9+GwJfSu5DWNofAeuldSGtPB8Aa8KL0TmRuH4FmBGwBp4FzZfcjc7oOvJr84jCwQdm/KqWZfe4wxSHgLvCrgg1qps8H4OruaAP+d2rnjdaAE8DBKW8ji7ENfAM2gafAQ+Br0R2JiIiIiIiIiIiIiIiIyML8BQSRxZx3y6C6AAAAAElFTkSuQmCC">
      <link rel="stylesheet" href="/globalStyles.css">
      <script type="text/javascript" src="/script.js"></script>
    </head>
  `
}

module.exports = renderHead;
