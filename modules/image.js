const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var photoSchema = new Schema({
	userid: String,
	path: String,
	isDefault: Boolean
});

var Photo = mongoose.model('photo', photoSchema);

module.exports = Photo;