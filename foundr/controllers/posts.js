const Post = require("../models/post").Post

//Get posts ordered by most recently updated first
exports.getPosts = (req, res, next) => {
	console.log('Getting posts from database.')
	
	Post.find({}, (err, posts) => {

		//Sort by last updated date
		posts.sort((a, b) => {
			a = new Date(a.updated.date);
		    b = new Date(b.updated.date);
		    return a>b ? -1 : a<b ? 1 : 0;
		})

		res.send(posts);
	})
}

//Create new post
exports.create = (req, res, next) => {
	const newPost = new Post();
	newPost.content = req.body.content

	console.log('Creating new post with the following data: ', req.body)

	newPost.save((err) => {
		if(err)
			return next(err);

		res.json({
			message: 'New post created.'
		})
	})
}