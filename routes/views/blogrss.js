var keystone = require('keystone');
var Entry = keystone.list('Entry');
var rss = require('node-rss');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// title : title of your feed
	// link : link to your website
	// desc : description of your feed
	// author : author of the feed
	// feedLink : link to the feed
	// options : additional options, explained below
	var feed = rss.createNewFeed(
		'Murilo Polese',
		process.env.SITE_URL,
		'',
		'Murilo Polese',
		process.env.SITE_URL + 'blog/rss.xml'
	);

	Entry.model.find()
		.where({
			type: 'blog',
			status: 'published'
		})
		.sort({createdAt: -1})
		.exec(function(err, entries) {
			if(err) {
				console.log( err );
				view.render('500');
				return;
			}
			if(!entries) {
				view.render('404');
				return;
			}


			entries.forEach(function (entry) {
					feed.addNewItem(
						entry.title,
						process.env.SITE_URL + entry.slug,
						entry.createdAt,
						entry.blog.brief ,
						{}
					);
			});

			var xmlString = rss.getFeedXML(feed);

			res.set('Content-Type', 'text/xml');
			res.send( xmlString );

		});

};
