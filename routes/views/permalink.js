var keystone = require('keystone');
var Post = keystone.list( 'Post' );
var Page = keystone.list( 'Page' );

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = req.params.slug;

	Page.model.findOne()
		.where({
			'slug': req.params.slug,
			'state': 'published'
		})
		.exec( function( err, page ) {

			if( err ) {
				console.log( 'error', err );
			}
			// If it isn't a page, check if it's a post
			if( !page ) {
				Post.model.findOne()
					.where({
						'slug': req.params.slug,
						'state': 'published'
					})
					.exec( function( err, post ) {

						if( err ) {
							console.log( 'error', err );
						}
						// If it's not a post, then it's "not found"
						if( !post ) {
							view.render( 'notfound' );
							return;
						}
						// Otherwise it's a post
						locals.contentType = 'post';
						locals.content = post;
						view.render( 'postsingle' );
					});
			} else {
				locals.contentType = 'page';
				locals.content = page;

				switch ( page.template ) {
					case 'pageindex':
					Post.model.find()
					.where( 'state', 'published' )
					.sort( '-priority' )
					.exec( function( err, posts ) {
						locals.posts = posts;
						view.render( page.template );
					})
					break;
					case 'pagesingle':
					default:
					view.render( page.template );
				}
				return;
			}
		})
};
