def template(state={}):
    return """
<header id="about">
    <p><strong>Hey there! I'm Murilo, a Brazilian creative technologist</strong>.</p>
    <p>When I'm not working as a full-stack developer, you can find me tinkering with music, exploring the wonders of the universe through microscopes, doodling on machines, and <a href="/about.html">more</a>!</p>
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
