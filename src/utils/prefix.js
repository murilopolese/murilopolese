import { withPrefix } from 'gatsby'

// Appends local prefix if not an absolute path
const prefix = (url) => {
	if (url.indexOf('http') !== -1 || url.indexOf('//') !== -1) {
		return url
	} else {
		return withPrefix(url)
	}
}
export default prefix
