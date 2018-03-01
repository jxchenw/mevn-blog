const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Blog = require('../modules/blog');
const User = require('../modules/user');
const Photo = require('../modules/image');
const router = express.Router();
const config = require('../config');

// setup multer
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads/')
	},
	filename: function (req, file, cb) {
		var arr = file.originalname.split('.');
		var ext = arr.pop();
		cb(null, arr.join('') + '-' + Date.now() + '.' + ext);
	}
})
var upload = multer({ storage: storage });

// Get Blogs
router.get('/blogs', function(req, res, next) {
	Blog.find({}).then(function(info) {
		res.send(info);
	});
});

router.get('/blogs/:id', function(req, res, next) {
	Blog.findOne({ _id: req.params.id }).then(function(info) {
		res.send(info);
	});
});

router.post('/blogs', function(req, res, next) {
	Blog.create(req.body).then(function(info) {
		res.send(info);
	}).catch(next);
});

router.put('/blogs/:id', function(req, res, next) {
	Blog.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function() {
		Blog.findOne({ _id: req.params.id }).then(function(info) {
			res.send(info);
		});
	});
});

router.delete('/blogs/:id', function(req, res, next) {
	Blog.findByIdAndRemove({ _id: req.params.id }).then(function(info) {
		res.send(info);
	});
});


router.get('/user/:id', function(req, res, next) {
	User.findById(req.params.id).then(function(info) {
		res.send(info);
	});
});

router.get('/users', function(req, res, next) {
	User.find({}).then(function(info) {
		res.send(info);
	});
});

router.post('/login', function(req, res, next) {
	if(!req.body.username || !req.body.password) {
		res.status(400).send('please enter both of username and password');
	} else {
		User.findOne({$or: [
			{ username: req.body.username },
			{ email: req.body.username }
		]}).exec().then(function(user) {
			if(user.password == req.body.password) {
				res.send(user._id);
			} else {
				res.status(400).send('password not match');
			}
		}).catch(function(err) {
			res.status(400).send('cannot find this user');
		});
	}
});

router.post('/signup', function(req, res, next) {
	if(!req.body.username || !req.body.password) {
		res.status(400).send('Missing details');
	} else {
		User.findOne({ username: req.body.username }).exec(function(err, result) {
			if(result != null)
				res.status(400).send('Account already exist');

			var newUser = {
				name: req.body.username,
				email: req.body.email,
				password: req.body.password
			};
			User.create(req.body).then(function(user) {
				res.send(user._id);
			});
		});

	}
});

router.put('/user/:id', function(req, res, next) {
	User.findByIdAndUpdate(req.params.id, req.body).then(function() {
		User.findById(req.params.id).then(function(info) {
			res.send(info);	
		});
	});
});

router.delete('/user/:id', function(req, res, next) {
	User.findByIdAndRemove(req.params.id).then(function(info) {
		res.send(info);
	});
});

router.post('/upload/image', upload.single('avator'), function(req, res, next) {
	Photo.create({ path: req.file.filename }).then(function(info) {
		res.send(info.path);
	}).catch(function(err) {
		res.status(400).send('upload failed');
	})
});

router.delete('/image/:name', function(req, res, next) {
	Photo.findOneAndRemove({ path: req.params.name }, function(err, photo) {
		if(err)
			return res.status(400).send('delete failed');
		var imagePath = path.normalize(config.base_url + '/uploads/' + req.params.name);
		fs.unlink(imagePath, function() {
			res.send({
				status: '200',
				responseType: 'String',
				response: 'success'
			})
		})
	})
});

module.exports = router;