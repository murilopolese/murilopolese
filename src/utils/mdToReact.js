import React from "react"
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { Box } from '@material-ui/core'
import Youtube from '../components/Youtube.js'
import withPrefix from './prefix'
import getImage from './getImage'

import unified from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import rehype2react from 'rehype-react'
import raw from 'rehype-raw'

function NonStretchedImage(props) {
  let normalizedProps = props
  if (props.fluid && props.fluid.presentationWidth) {
    normalizedProps = {
      ...props,
      style: {
        ...(props.style || {}),
        maxWidth: props.fluid.presentationWidth,
        margin: "0 auto", // Used to center the image
      },
    }
  }

  return <Img {...normalizedProps} />
}

function MyImage(props) {
	let src = props.src
	let images = props.images || {}
	let image = getImage(images, src, 'fluid')
	return (
		<Box py={1} display="inline-block" align="center" width="100%">
			{
				image
				? <NonStretchedImage alt={props.alt} fluid={image} />
				: <img alt={props.alt} src={props.src} />
			}
		</Box>
	)
}
function MyLink(props) {
	if (props.href.indexOf('http') !== -1) {
		return <a target="_blank" refer="noreferer noopener" {...props}>{props.children}</a>
	} else {
		return <Link to={props.href} {...props}>{props.children}</Link>
	}
}
function MyIframe(props) {
	if (props.src.indexOf('youtube') !== -1) {
		return (
			<Box py={2}>
				<Youtube url={props.src} />
			</Box>
		)
	} else if (props.src.indexOf('vimeo') !== -1) {
		return (
			<Box py={2} >
				<iframe src={props.src}
					width="890" height="500" frameBorder="0"
					allow="autoplay; fullscreen" allowFullScreen />
			</Box>
		)
	} else if (props.src.indexOf('.mp4') !== -1) {
		return (
			<Box py={2} align="center">
				<video width={props.width} height={props.height || 500} controls>
					<source src={props.src} type="video/mp4" />
					Your browser does not support the video tag. Watch the video
					<a href={props.src} target="_blank" rel="noopener noreferer">here</a> instead.
				</video>
			</Box>
		)
	} else {
		return <iframe {...props} />
	}
}


function mdToReact(md, images) {
	let processor = unified()
		.use(markdown)
		.use(remark2rehype, { allowDangerousHTML: true })
		.use(raw)
		.use(rehype2react, {
			createElement: React.createElement,
			components: {
				a: MyLink,
				img: (props) => <MyImage images={images} {...props} />,
				iframe: MyIframe
			}
		})
	return processor.processSync(md).contents
}

export default mdToReact
