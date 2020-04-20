import React, { useState } from 'react'
import { Link } from 'gatsby'
import { Container, Grid, Box, Chip } from '@material-ui/core'
import SEO from '../components/SEO'
import Menu from '../components/Menu'
import withPrefix from '../utils/prefix'

import mdToReact from '../utils/mdToReact'
import '../globalStyles.css'

const getUniqueTags = (posts) => {
	return posts.reduce(
		(acc, post) => {
			// No tags no probs
			if (!post.tags) {
				return acc
			}
			// Only concatenate the tags that are not already on acc
			return acc.concat(
				post.tags.filter(tag => acc.indexOf(tag) === -1)
			)
		},
		[]
	)
}

const IndexPage = (e) => {
	const [selectedTag, setSelectedTag] = useState(null);
	const page = e.pageContext.page
	const posts = e.pageContext.posts
	const filteredPosts = posts.filter((post) => {
		if (selectedTag) {
			return post.tags.indexOf(selectedTag) !== -1
		} else {
			return post
		}
	})
	const toggleTag = (tag) => {
		if (selectedTag != tag) {
			setSelectedTag(tag)
		} else {
			setSelectedTag(null)
		}
	}
	let uniqueTags = getUniqueTags(posts)
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
				<Grid item align="center">
					{uniqueTags.map((tag) => {
						const isSelected = (selectedTag === tag)
						const style = {
							fontFamily: 'inherit',
							fontSize: '1.2rem',
							marginRight: 5,
							fontWeight: isSelected ? 'bold' : '',
							background: isSelected ? '#333' : 'inherit',
							color: isSelected ? 'white' : 'inherit'
						}
						return (
							<Chip
								clickable
								style={style}
								label={tag}
								onClick={() => toggleTag(tag)}
								/>
						)
					})}
				</Grid>
				<Grid item container spacing={5}>
				{filteredPosts.map((p, i) => {
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
