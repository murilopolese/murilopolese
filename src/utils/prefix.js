import React from 'react'
import { withPrefix } from 'gatsby'

const prefix = (url) => {
	if (url.indexOf('http') || url.indexOf('//')) {
		return url
	} else {
		return withPrefix(url)
	}
}
export default prefix
