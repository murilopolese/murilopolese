var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Navigation Model
 * ==========
 */
var Navigation = new keystone.List('Navigation');

Navigation.add({
	label: { type: Types.Text, required: true, index: true, initial: true },
	key: { type: Types.Text, required: true, index: true, initial: true },
	link: { type: Types.Url, required: true, index: true, initial: true },
	newTab: { type: Types.Boolean, required: false, default: false },
	order: { type: Types.Number, required: false, default: 50 }
});

/**
 * Registration
 */
Navigation.defaultColumns = 'label, link, order';
Navigation.register();
