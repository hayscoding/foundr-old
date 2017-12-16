const controller = require('../controllers/posts');
const router = require('express').Router();

router.route('/')
	.get(controller.getPosts)
	.post(controller.create)

module.exports = router;