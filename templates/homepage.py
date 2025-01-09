def template(state={}):
    return """
<header id="about">
    <p><strong>Hi, my name is Murilo. I'm a Brazilian full-stack developer and creative technologist based in Stockholm.</strong></p>
    <p>I say <em>full-stack developer</em> when I want to explain what I am capable of doing and <em>creative technologist</em> to express how (and why) I like to do those things. <a href="about.html">Read more here</a>.</p>
    <p>When I am not writing software I am probably playing music, tinkering with drawing machines, learning to teach and looking at the microscope. Sometimes I write quirky code to do <a href="https://www.bananabanana.me/" target="_blank">all those things</a>!</p>
    <p>I have worked with <a href="https://strawbees.com/" target="_blank">Strawbees</a>, <a href="https://kano.me" target="_blank">Kano</a>, <a href="https://makeymakey.com/" target="_blank">Makey Makey</a>, <a href="https://arduino.cc" target="_blank">Arduino</a>, <a href="https://sfpc.study/" target="_blank">School for Poetic Computation</a>, <a href="https://www.hyperisland.com" target="_blank">Hyper Island</a> and <a href="https://www.konstfack.se/" target="_blank">Konsftack</a> as well as being an artist in residency at <a href="https://www.blivande.com/" target="_blank">Blivande</a>, <a href="https://www.blivande.com/" target="_blank">Visualia</a> and <a href="https://www.cidadequintal.com.br/lab" target="_blank">Fantástica Carpintaria</a>.</p>
    <p><a href="mailto:murilopolese+dotcom@gmail.com">Email</a> / <a target="_blank" href="https://sunbeam.city/@murilove">Mastodon</a> / <a target="_blank" href="https://www.instagram.com/murilopolese">Instagram</a> / <a target="_blank" href="https://github.com/murilopolese">Github</a></p>
</header>
<section>
    <h2><a href="projects.html">Projects</a></h2>
    {featured_projects}
    <a class="more" href="projects.html">More</a>
</section>
<section>
    <h2><a href="learning.html">Learning</a></h2>
    {featured_learning}
    <a class="more" href="learning.html">More</a>
</section>
    """.format(
        featured_projects=state['featured_projects'],
        featured_learning=state['featured_learning'],
    )
