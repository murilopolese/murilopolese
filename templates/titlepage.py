def template(state={}):
    return """
<section>
    <h2>{title}</h2>
    {content}
</section>
    """.format(
        title=state['title'],
        content=state['content'],
    )
