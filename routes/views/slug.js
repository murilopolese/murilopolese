var keystone = require('keystone');
var Entry = keystone.list('Entry');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	console.log(req.params.slug)

	Entry.model.findOne()
		.where({
			slug: req.params.slug,
			status: 'published'
		})
		.exec(function(err, entry) {
			if(err) {
				console.log( err );
				view.render('500');
				return;
			}
			if(!entry) {
				view.render('404');
				return;
			}

			// locals.entry = entry;
			locals.entry = entry[entry.type];
			switch(entry.type) {
				case 'page':
				case 'blog':
				case 'project':
				case 'vaporwave':
					locals.section = entry.slug;
					view.render(entry.type);
					break;
				case 'index':
					locals.section = entry.slug;
					// Load entries for the selected thing
					Entry.model.find().where({
							type: entry.index.list,
							status: 'published'
						})
						.sort({createdAt: -1})
						.exec(function(err, entries) {
							if(err) {
								console.log( err );
								view.render('500');
								return;
							}
							locals.entries = entries;
							view.render(entry.index.list + 'index');
						})
					break;
				default:
					view.render('404');
				 	break;
			}
		});

};
