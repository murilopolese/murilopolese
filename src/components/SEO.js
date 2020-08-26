import React from "react"
import Helmet from "react-helmet"
import favicon from '../favicon.png'

function SEO({ description, lang, meta, title, image }) {
	return (
		<Helmet
			htmlAttributes={{
				lang,
			}}
			title={title}
			meta={[
				{
					name: `description`,
					content: description,
				},
				{
					property: `og:title`,
					content: title,
				},
				{
					property: `og:description`,
					content: description,
				},
				{
					property: `og:type`,
					content: `website`,
				},
				{
					name: `twitter:card`,
					content: `summary`,
				},
				{
					name: `twitter:creator`,
					content: '@murilopolese',
				},
				{
					name: `twitter:title`,
					content: title,
				},
				{
					name: `twitter:description`,
					content: description,
				},
				{
					property: `twitter:image`,
					content: image,
				},
			].concat(meta)}
			link={[
					{ rel: "icon", type: "image/png", href: `${favicon}` }
				]}
		>
		<script async defer data-website-id="981e504f-9b11-4611-b323-3acddfde0c08" src="http://umami.bananabanana.me/umami.js"></script>
		</Helmet>
	)
}

SEO.defaultProps = {
	lang: `en`,
	meta: [],
	description: ``,
	image: ``,
}

export default SEO
