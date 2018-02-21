const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var categorySchema = new Schema({
	name: String,
	parent: {
		type: Number,
		default: 0
	}
});

var blogSchema = new Schema({
	title: String,
	author: String,
	category: [String],
	content: String,
	createdBy: {
		type: Date,
		default: Date.now
	},
	updatedBy: {
		type: Date,
		default: Date.now
	},
	isShown: {
		type: Boolean,
		default: false
	}
});

var Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;