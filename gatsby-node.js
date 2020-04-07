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
	buildlog.forEach(function(post, i) {
		let prevPage = buildlog.slice(i-1, i)[0]
		let nextPage = buildlog.slice(i+1, i+2)[0]
		console.log('creating page', `/buildlog/${createPath(post)}`)
		createPage({ // Index pages
			path: `/buildlog/${createPath(post)}`,
			component: require.resolve('./src/templates/page.js'),
			context: {
				page: post,
				prevPage,
				nextPage
			}
		})
	})
	dev.sort()
	dev.reverse()
	dev.forEach(function(post, i) {
		let prevPage = dev.slice(i-1, i)[0]
		let nextPage = dev.slice(i+1, i+2)[0]
		console.log('creating page', `/dev/${createPath(post)}`)
		createPage({
			path: `/dev/${createPath(post)}`,
			component: require.resolve('./src/templates/page.js'),
			context: {
				page: post,
				prevPage,
				nextPage
			}
		})
	})
	workshop.sort()
	workshop.reverse()
	workshop.forEach(function(post, i) {
		let prevPage = workshop.slice(i-1, i)[0]
		let nextPage = workshop.slice(i+1, i+2)[0]
		console.log('creating page', `/workshop/${createPath(post)}`)
		createPage({
			path: `/workshop/${createPath(post)}`,
			component: require.resolve('./src/templates/page.js'),
			context: {
				page: post,
				prevPage,
				nextPage
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
