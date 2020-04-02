import React from 'react'
import { Link } from 'gatsby'
import { Container, Grid, Box } from '@material-ui/core'

const Thumbnail = ({path, date, cover, title, excerpt}) => {
	return (
		<Box className="thumbnail">
			<Link to={path}>
				<h3>{date.join('-')}: {title}</h3>
				{cover ? <img src={cover} alt={title} /> : ''}
			</Link>
			<p>{excerpt}</p>
			<p><Link to={path}>Read more</Link></p>
		</Box>
	)
}

export default Thumbnail