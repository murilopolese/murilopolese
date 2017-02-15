var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var EntryType = [
	'page', 'index', 'project', 'blog', 'vaporwave'
];

var Entry = new keystone.List('Entry', {
	autokey: { path: 'slug', from: 'title', unique: true },
	map: { name: 'title' },
	defaultSort: '-createdAt'
});

Entry.add({
	title: { type: Types.Text, required: true, initial: true },
	slug: { type: Types.Key, index: true },
	status: { type: Types.Select, required: false, options: 'draft,published,archived', default: 'draft' },
	// tags: { type: Types.Relationship, ref: 'Tag', many: true, initial: false },
	type: {
		type: Types.Select,
		initial: true,
		required: true,
		options: EntryType
	},

	// Page fields
	page: {
		images: { type: Types.CloudinaryImages, dependsOn: { type: 'page' } },
		brief: { type: Types.Markdown, dependsOn: { type: 'page' } },
		content: { type: Types.Markdown, dependsOn: { type: 'page' } }
	},

	// Index fields
	index: {
		list: {
			type: Types.Select,
			options: EntryType,
			dependsOn: { type: 'index' }
		},
		content: { type: Types.Markdown, dependsOn: { type: 'index' } }
	},

	// Project fields
	project: {
		images: { type: Types.CloudinaryImages, dependsOn: { type: 'project' } },
		brief: { type: Types.Markdown, dependsOn: { type: 'project' } },
		content: { type: Types.Markdown, dependsOn: { type: 'project' } }
	},

	// Blog fields
	blog: {
		images: { type: Types.CloudinaryImages, dependsOn: { type: 'blog' } },
		brief: { type: Types.Markdown, dependsOn: { type: 'blog' } },
		content: { type: Types.Markdown, dependsOn: { type: 'blog' } }
	},

	// Vaporwave fields
	vaporwave: {
		images: { type: Types.CloudinaryImages, dependsOn: { type: 'vaporwave' } },
		brief: { type: Types.Markdown, dependsOn: { type: 'vaporwave' } },
		content: { type: Types.Markdown, dependsOn: { type: 'vaporwave' } }
	},

	homepage: { type: Types.Boolean, default: false },
	createdAt: { type: Date, default: Date.now }
});

/**
 * Registration
 */
Entry.defaultColumns = 'title, type|20%, status|20%, homepage|15%';
Entry.register();
