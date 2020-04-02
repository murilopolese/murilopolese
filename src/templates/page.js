import React from "react"
import { withPrefix } from 'gatsby'
import { Container, Grid } from '@material-ui/core'
import SEO from '../components/SEO'
import Menu from '../components/Menu'
import Thumbnail from '../components/Thumbnail'

import mdToReact from '../utils/mdToReact'
import '../globalStyles.css'

const SinglePage = (e) => {
	const page = e.pageContext.page
	const nextPage = e.pageContext.nextPage
	const prevPage = e.pageContext.prevPage
	return (
		<Container maxWidth="md">
			<SEO
				title={`Murilo Polese - ${page.title}`}
				description={page.description}
				image={withPrefix(page.image)}
			/>
			<Grid container direction="column">
				<Grid item><Menu /></Grid>
				<Grid item><h2>{page.title}</h2></Grid>
				<Grid item>{mdToReact(page.content)}</Grid>
				<Grid item><br /></Grid>
				<Grid item container spacing={3}>
					<Grid item xs={12} md={6}>
						{prevPage ? <Thumbnail {...prevPage} /> : null}
					</Grid>
					<Grid item xs={12} md={6}>
						{nextPage ? <Thumbnail {...nextPage} /> : null}
					</Grid>
				</Grid>
			</Grid>
		</Container>
	)
}

export default SinglePage
