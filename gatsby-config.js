// pathPrefix = '/murilopolese'
// siteUrl = 'https://murilopolese.github.io'
let pathPrefix = ''
let siteUrl = 'http://localhost:8000'

module.exports = {
	pathPrefix: pathPrefix,
	siteMetadata: {
		title: `Murilo Polese`,
		description: `Personal website, portfolio and blog.`,
		author: `@murilopolese`,
		siteUrl: siteUrl,
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-plugin-material-ui`,
			options: {
				stylesProvider: {
					injectFirst: true,
				},
			},
		},
		{
			resolve: `gatsby-plugin-remove-serviceworker`,
			options: {
				filename: 'service-worker.js'
			}
		}
	],
}
