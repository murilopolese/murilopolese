import React from "react"
import { Link, withPrefix } from 'gatsby'

import unified from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import rehype2react from 'rehype-react'
import raw from 'rehype-raw'

function MyImage(props) {
	if (props.src.indexOf('http') !== -1) {
		return <img src={props.src} alt={props.alt} />
	} else {
		return <img src={withPrefix(props.src)} alt={props.alt} />
	}
}
function MyLink(props) {
	if (props.href.indexOf('http') !== -1) {
		return <a target="_blank" refer="noreferer noopener" {...props}>{props.children}</a>
	} else {
		return <Link to={props.href} {...props}>{props.children}</Link>
	}
}

let processor = unified()
	.use(markdown)
	.use(remark2rehype, { allowDangerousHTML: true })
	.use(raw)
	.use(rehype2react, {
		createElement: React.createElement,
		components: {
			a: MyLink,
			img: MyImage,
		}
	})

function mdToReact(md) {
	return processor.processSync(md).contents
}

export default mdToReact
