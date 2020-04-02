import React from 'react'
import { Link } from 'gatsby'
import { Container, Grid, Box } from '@material-ui/core'
import SEO from '../components/SEO'
import Menu from '../components/Menu'
import withPrefix from '../utils/prefix'

import mdToReact from '../utils/mdToReact'
import '../globalStyles.css'


const IndexPage = (e) => {
	const page = e.pageContext.page
	const posts = e.pageContext.posts
	return (
		<Container maxWidth="md">
			<SEO
				title={`Murilo Polese - ${page.title}`}
				description={page.description}
				image={page.image}
			/>
			<Grid container direction="column">
				<Grid item><Menu /></Grid>
				<Grid item><h2>{page.title}</h2></Grid>
				<Grid item>{mdToReact(page.content)}</Grid>
				<Grid item container spacing={3}>
				{posts.map((p, i) => {
					return (
						<Grid item xs={12} md={6}>
							<Box className="thumbnail" key={i}>
								<Link to={p.path}>
									<h3>{p.date.join('-')}: {p.title}</h3>
									{p.cover ? <img src={withPrefix(p.cover)} alt={p.title} /> : ''}
								</Link>
								<p>{p.excerpt}</p>
								<p><Link to={p.path}>Read more</Link></p>
							</Box>
						</Grid>
					)
				})}
				</Grid>
				<Grid item><br /></Grid>
			</Grid>
		</Container>
	)
}

export default IndexPage
