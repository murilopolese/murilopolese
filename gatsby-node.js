const frontmatter = require('frontmatter')
const fs = require('fs').promises
const resolve = require('path').resolve

async function getContent(contentPath) {
	let activityDir = resolve('./content', contentPath)
	let dir = await fs.readdir(activityDir)
	let filesPromise = dir.map(async (path) => {
		return await fs.readFile(resolve(activityDir, path), 'utf8')
	})
	let files = await Promise.all(filesPromise)
	return files.map((file, i) => {
		try {
			let md = frontmatter(file)
			return {
				content: md.content,
				file: { name: dir[i], content: file },
				...md.data
			}
		} catch (e) {
			console.log("error parsing markdown", e)
		}
	})
}

function createPath(post) {
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

	const buildlog = await getContent('buildlogs')
	const dev = await getContent('dev')
	const workshop = await getContent('workshops')

	// Sort posts by filename desc
	buildlog.sort()
	buildlog.reverse()
	buildlog.forEach(function(post) {
		console.log('creating page', `/buildlog/${createPath(post)}`)
		createPage({ // Index pages
			path: `/buildlog/${createPath(post)}`,
			component: require.resolve('./src/templates/page.js'),
			context: {
				page: post
			}
		})
	})
	dev.sort()
	dev.reverse()
	dev.forEach(function(post) {
		console.log('creating page', `/dev/${createPath(post)}`)
		createPage({ // Index pages
			path: `/dev/${createPath(post)}`,
			component: require.resolve('./src/templates/page.js'),
			context: {
				page: post
			}
		})
	})
	workshop.sort()
	workshop.reverse()
	workshop.forEach(function(post) {
		console.log('creating page', `/workshop/${createPath(post)}`)
		createPage({ // Index pages
			path: `/workshop/${createPath(post)}`,
			component: require.resolve('./src/templates/page.js'),
			context: {
				page: post
			}
		})
	})

	// Dictionary to aggregate on lists
	const posts = { buildlog, dev, workshop }
	pages.forEach(function(page) {
		console.log('creating page', page.path)
		if (page.category) {
			let categoryPosts = posts[page.category]
			categoryPosts = categoryPosts.map((p) => {
				p.path = `${page.category}/${createPath(p)}`
				return p
			})
			createPage({ // Index pages
				path: page.file.name.slice(0, -3),
				component: require.resolve('./src/templates/index.js'),
				context: {
					page: page,
					posts: categoryPosts
				}
			})
		} else {
			createPage({ // Pages
				path: page.path,
				component: require.resolve('./src/templates/page.js'),
				context: {
					page: page
				}
			})
		}
	})
}
