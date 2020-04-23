const frontmatter = require('frontmatter')
const fs = require('fs').promises
const resolve = require('path').resolve
const graphql = require('graphql')

async function getContent(contentPath) {
	let content = resolve('./content', contentPath)
	let dir = await fs.readdir(content)
	let filesPromise = dir.map(async function(path) {
		return await fs.readFile(resolve(content, path), 'utf8')
	})
	let files = await Promise.all(filesPromise)
	return files.map(function(file, i) {
		try {
			let md = frontmatter(file)
			// Messed up way to get dates from filename
			let date = dir[i].split('-').slice(0, 2)
			return {
				file: { name: dir[i], content: file }, // Original file
				date: date,
				content: md.content, // Markdown content (raw text format)
				...md.data // front matter meta data
			}
		} catch (e) {
			console.log("error parsing markdown", e)
		}
	})
}

function createSlug(post) {
	// Remove .md extension and split by -
	let parsedName = post.file.name.slice(0, -3).split('-')
	let year = parsedName[0]
	let month = parsedName[1]
	// let day = parsedName[2]
	let title = parsedName.slice(3).join('-')
	return `${year}-${month}-${title}`
}

async function getAllImages(graphql) {
	return await graphql(`
	{
		allFile(filter: {extension: {ne: "md"}}) {
			nodes {
				relativePath
				publicURL
				childImageSharp {
					fixed(width:420) {
						tracedSVG
						width
						height
						src
						srcSet
					}
					fluid(maxWidth: 920) {
						tracedSVG
						aspectRatio
						src
						srcSet
						sizes
					}
				}
			}
		}
	}
`)
}

exports.createPages = async function(e) {
	const createPage = e.actions.createPage
	const graphql = e.graphql

	const query = await getAllImages(graphql)
	const imageNodes = query.data.allFile.nodes
	const images = imageNodes.reduce(
		function(acc, node) {
			if (node.childImageSharp) {
				acc[node.relativePath] = node.childImageSharp
			} else {
				acc[node.relativePath] = {
					src: node.publicURL
				}
			}
			return acc
		},
		{}
	)

	const pages = await getContent('pages')
	const content = {
		'project': await getContent('projects'),
		'workshop': await getContent('workshops'),
		'blog': await getContent('blog')
	}

	// Creating pages
	pages.forEach(function(page) {
		console.log('creating page', page.path)
		// If page doesn't have category, render single page template
		if (!page.category) {
			createPage({ // Pages
				path: page.path,
				component: require.resolve('./src/templates/page.js'),
				context: {
					page: page,
					images: images
				}
			})
		} else {
			/*
			If page has category, render the index template with the posts
			from content dictionary
			*/
			let categoryPosts = content[page.category] || []
			categoryPosts = categoryPosts.map(function(p) {
				p.path = `${page.category}/${createSlug(p)}`
				return p
			})
			categoryPosts.sort()
			categoryPosts.reverse()
			createPage({ // Index pages
				path: page.path,
				component: require.resolve('./src/templates/index.js'),
				context: {
					page: page,
					posts: categoryPosts,
					images: images
				}
			})
		}
	})

	/*
	Iterate over first level of content dictionary (category) and create the
	single posts
	*/
	Object.keys(content).forEach(function(category) {
		let posts = content[category] || []
		posts.forEach(function(post, i) {
			let prevPage, nextPage
			if (i == posts.length-1) { // last
				prevPage = posts[i-1]
				nextPage = posts[i-2]
			} else if (i == 0) { // first
				prevPage = posts[i+1]
				nextPage = posts[i+2]
			} else {
				prevPage = posts[i-1]
				nextPage = posts[i+1]
			}
			console.log('creating page', `/${category}/${createSlug(post)}`)
			createPage({ // Index pages
				path: `/${category}/${createSlug(post)}`,
				component: require.resolve('./src/templates/page.js'),
				context: {
					page: post,
					category: category,
					prevPage: prevPage,
					nextPage: nextPage,
					images: images
				}
			})
		})
	})

}
