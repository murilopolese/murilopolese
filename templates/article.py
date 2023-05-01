def template(state={}):
    # print(state)
    return """
<article>
    <figure><img src="./media/{cover}" /></figure>
    <section>
        <h3>{title}</h3>
        <p>{description}</p>
    </section>
</article>
    """.format(
        title=state['title'],
        cover=state['cover'],
        description=state['description'],
    )
