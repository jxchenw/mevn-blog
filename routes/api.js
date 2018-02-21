const express = require('express');
const Blog = require('../modules/blog');
const router = express.Router();

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

module.exports = router;