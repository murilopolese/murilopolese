// Get image object to pass to gatsby image
function getImage(images, path, variant) {
	if (path && path.indexOf('/') === 0) { // remove root slash
		path = path.substring(1)
	}
	const image = images[path]
	if (!image) return null
	variant = variant || 'fluid'
	switch (variant) {
		case 'fixed':
			return image.fixed
			break;
		case 'fluid':
		default:
		return image.fluid

	}
}

export default getImage
