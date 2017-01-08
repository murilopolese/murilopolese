var keystone = require('keystone');
var Page = keystone.list( 'Page' );

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	Page.model.findOne()
		.where( 'homePage', true )
		.exec( function( err, page ) {

			if( !page ) {
				view.render('notfound');
				return;
			}

			locals.section = 'home';
			locals.content = page;
			view.render( page.template );

		})

};
