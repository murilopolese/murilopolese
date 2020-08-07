import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { Container, Grid, Box } from '@material-ui/core'
import withPrefix from '../utils/prefix'
import getImage from '../utils/getImage'

const Thumbnail = ({path, date, cover, title, excerpt, images}) => {
	let resizedImage = getImage(images, cover, 'fixed')
	let Image = ''
	if (resizedImage) {
		Image = <Img fixed={resizedImage} alt={title} align="center" />
	} else if (cover) {
		let originalImage = images[cover]
		if (originalImage) {
			Image = <img src={originalImage.src} alt={title} />
		} else {
			Image = <img src={cover} alt={title} />
		}
	}

	return (
		<Box className="thumbnail">
			<Link to={path}>
				<h3>{date.join('-')}: {title}</h3>
				{Image}
			</Link>
			<p>{excerpt}</p>
			<p><Link to={path}>Read more</Link></p>
		</Box>
	)
}

export default Thumbnail
