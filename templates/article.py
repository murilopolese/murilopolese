def template(state={}):
    links = ''
    if 'links' in state.keys():
        for title in state['links'].keys():
            links += """
                <a class="external" target="_blank" href="{url}">{title} 🔗 </a>
            """.format(
                title=title,
                url=state['links'][title]
            )
    return """
<article>
    <figure><img src="./media/{cover}" /></figure>
    <section>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{links}</p>
    </section>
</article>
    """.format(
        title=state['title'],
        cover=state['cover'],
        description=state['description'],
        links=links
    )
