import React from 'react'
import { Link, withPrefix } from 'gatsby'
import { Container, Grid, Box } from '@material-ui/core'
import SEO from '../components/SEO'
import Menu from '../components/Menu'

import mdToReact from '../utils/mdToReact'
import '../globalStyles.css'

const prefix = (p) => {
	if (p && p.indexOf('http') === -1) {
		return withPrefix(p)
	} else {
		return p
	}
}

const IndexPage = (e) => {
	const page = e.pageContext.page
	const posts = e.pageContext.posts
	return (
		<Container maxWidth="md">
			<SEO
				title={`Murilo Polese - ${page.title}`}
				description={page.description}
				image={prefix(page.image)}
			/>
			<Grid container direction="column">
				<Grid item><Menu /></Grid>
				<Grid item><h2>{page.title}</h2></Grid>
				<Grid item>{mdToReact(page.content)}</Grid>
				<Grid item>{posts.map((p, i) => {
					return (
						<Box className="thumbnail" key={i} pb={2}>
							<Link to={p.path}>
								<h3>{p.date.join('-')}: {p.title}</h3>
								{p.cover ? <img src={prefix(p.cover)} alt={p.title} /> : ''}
							</Link>
							<p>{p.excerpt}</p>
							<p><Link to={p.path}>Read more</Link></p>
						</Box>
					)
				})}</Grid>
				<Grid item><br /></Grid>
			</Grid>
		</Container>
	)
}

export default IndexPage
