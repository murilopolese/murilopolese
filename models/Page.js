var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Page Model
 * ==========
 */
var Page = new keystone.List('Page', {
	autokey: { path: 'slug', from: 'title', unique: true },
	map: { name: 'title' },
	defaultSort: '-createdAt'
});

Page.add({
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', initial: true },
	template: { type: Types.Select, options: 'pagesingle, pageindex', required: true, initial: true },
	title: { type: Types.Text, required: false, initial: true },
	body: { type: Types.Html, wysiwyg: true, required: true, initial: true },
	homePage: { type: Types.Boolean, initial: true, required: false, default: false },
	createdAt: { type: Date, default: Date.now }
});


/**
 * Registration
 */
Page.defaultColumns = 'title, slug, homePage';
Page.register();
