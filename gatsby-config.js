let pathPrefix = '/murilopolese'
let siteUrl = 'https://murilopolese.github.io'
// let pathPrefix = '/public'
// let siteUrl = 'http://localhost:8080'

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
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `markdown-pages`,
				path: `${__dirname}/content`,
			},
		},
		'gatsby-transformer-remark'
	],
}
