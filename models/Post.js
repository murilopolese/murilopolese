var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */
var Post = new keystone.List('Post', {
	autokey: { path: 'slug', from: 'title', unique: true },
	map: { name: 'title' },
	defaultSort: '-createdAt'
});

Post.add({
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', initial: true },
	title: { type: Types.Text, required: false, index: true, initial: true },
	body: { type: Types.Html, wysiwyg: true, required: false, initial: true },
	thumbnail: { type: Types.CloudinaryImage, required: false },
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true, initial: true },
	createdAt: { type: Date, default: Date.now },
	priority: { type: Types.Number, required: false, default: 0 }
});


/**
 * Registration
 */
Post.defaultColumns = 'title, slug, priority, createdAt';
Post.register();
