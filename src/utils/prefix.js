import React from 'react'
import { withPrefix } from 'gatsby'

const prefix = (url) => {
	if (url.indexOf('http') !== -1 || url.indexOf('//') !== -1) {
		return url
	} else {
		return withPrefix(url)
	}
}
export default prefix
