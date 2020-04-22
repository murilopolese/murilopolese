const frontmatter = require('frontmatter')
const fs = require('fs').promises
const resolve = require('path').resolve

async function getContent(contentPath) {
	let content = resolve('./content', contentPath)
	let dir = await fs.readdir(content)
	let filesPromise = dir.map(async (path) => {
		return await fs.readFile(resolve(content, path), 'utf8')
	})
	let files = await Promise.all(filesPromise)
	return files.map((file, i) => {
		try {
			let md = frontmatter(file)
			let date = dir[i].split('-').slice(0, 2)
			return {
				content: md.content,
				file: { name: dir[i], content: file },
				date: date,
				...md.data
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

exports.createPages = async function(e) {
	const createPage = e.actions.createPage
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
					page: page
				}
			})
		} else {
			/*
			If page has category, render the index template with the posts
			from content dictionary
			*/
			let categoryPosts = content[page.category] || []
			categoryPosts = categoryPosts.map((p) => {
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
					posts: categoryPosts
				}
			})
		}
	})

	/*
	Iterate over first level of content dictionary (category) and create the
	single posts
	*/
	Object.keys(content).forEach((category) => {
		let posts = content[category] || []
		posts.forEach((post, i) => {
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
					category,
					prevPage,
					nextPage
				}
			})
		})
	})

}
