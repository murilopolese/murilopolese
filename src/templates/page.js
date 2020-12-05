import React from "react"
import { withPrefix } from 'gatsby'
import { Container, Grid } from '@material-ui/core'
import SEO from '../components/SEO'
import Menu from '../components/Menu'
import Thumbnail from '../components/Thumbnail'

import mdToReact from '../utils/mdToReact'
import pluralize from '../utils/pluralize'
import getImage from '../utils/getImage'
import '../globalStyles.css'


const SinglePage = (e) => {
	const category = e.pageContext.category
	const page = e.pageContext.page
	const nextPage = e.pageContext.nextPage
	const prevPage = e.pageContext.prevPage
	const images = e.pageContext.images

	return (
		<Container maxWidth="md">
			<SEO
				title={`Murilo Polese - ${page.title}`}
			/>
			<Grid container direction="column">
				<Grid item><Menu /></Grid>
				<Grid item><h2>{page.title}</h2></Grid>
				<Grid item style={{width: '100%', maxWidth: 960}}>{mdToReact(page.content, images)}</Grid>
				<Grid item><br /></Grid>
				<Grid item container spacing={3}>
					<Grid item xs={12} align="center">
						{category ? <h3>Other {pluralize(category)}</h3> : null}
					</Grid>
					<Grid item xs={12} md={6}>
						{prevPage ? <Thumbnail images={images} {...prevPage} /> : null}
					</Grid>
					<Grid item xs={12} md={6}>
						{nextPage ? <Thumbnail images={images} {...nextPage} /> : null}
					</Grid>
				</Grid>
			</Grid>
		</Container>
	)
}

export default SinglePage
