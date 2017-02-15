var keystone = require('keystone');
var Entry = keystone.list('Entry');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	Entry.model.findOne()
		.where({
			homepage: true,
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

			locals.section = entry.type;
			// locals.entry = entry;
			locals.entry = entry[entry.type];
			switch(entry.type) {
				case 'page':
				case 'blog':
				case 'project':
				case 'vaporwave':
					view.render(entry.type);
					break;
				case 'index':
					Entry.model.find().where({type: entry.index.list})
						.exec(function(err, entries) {
							if(err) {
								console.log( err );
								view.render('500');
								return;
							}
							locals.entries = entries;
							view.render(entry.type + 'index');
						})
					break;
				default:
					view.render('404');
				 	break;
			}
		});

};
