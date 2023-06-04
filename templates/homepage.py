def template(state={}):
    return """
<header id="about">
    <p><strong>Hello! I am a Brazilian technologist</strong><br> (or a full stack developer if you prefer).</p>
    <p>I'm profoundly interested in learning experiences and technology. But I'm equally interested in music, microscopes, drawing machines and <a href="/about.html">more</a>.</p>
    <p><a href="mailto:murilopolese+dotcom@gmail.com">Email</a> / <a target="_blank" href="https://sunbeam.city/@murilove">Mastodon</a> / <a target="_blank" href="https://github.com/murilopolese">Github</a></p>
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
