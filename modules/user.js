const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema ({
	'username': String,
	'password': String,
	'email': String,
	'address': String,
	'city': String,
	'province': String,
	'postcode': String,
	'phone': Number,
	'image': String
});

var User = mongoose.model('User', userSchema);

module.exports = User;