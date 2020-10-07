const express = require('express');
const { checkUserId, checkUserData} =require("./middleware/user")
const router = express.Router();

router.post('/', checkUserData(),(req, res) => {
  // do your magic!
  users.insert(req.body)
		.then((user) => {
				res.status(201).json(user)
			})
		.catch((error) => {
			console.log(error)
		})
});

router.post('/:id/posts',checkUserId(), (req, res) => {
  // do your magic!
  if (!req.body.text) {
		return res.status(400).json({
			message: "Need a value for text",
		})
	}

	users.addUserPost(req.params.id, req.body)
		.then((post) => {
			res.status(201).json(post)
		})
		.catch((error) => {
			next(error)
		})
});

router.get('/', (req, res) => {
  // do your magic!
  const options = {
		sortBy: req.query.sortBy,
		limit: req.query.limit,
	}

	users.find(options)
		.then((users) => {
			res.status(200).json(users)
		})
		.catch((error) => {
			next(error)
		})
});

router.get('/:id', checkUserId(), (req, res) => {
  // do your magic!
  
  res.status(200).json(req.user)
});

router.get('/:id/posts',checkUserId(), (req, res) => {
  // do your magic!
  users.findUserPosts(req.params.id)
		.then((posts) => {
			res.status(200).json(posts)
		})
		.catch((error) => {
			next(error)
		})
});

router.delete('/:id',checkUserId(), (req, res) => {
  // do your magic!
  users.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: "The user has been nuked",
				})
			} else {
				res.status(404).json({
					message: "The user could not be found",
				})
			}
		})
		.catch((error) => {
			next(error)
		})
});

router.put('/:id', checkUserData(), checkUserId(), (req, res) => {
  // do your magic!
  users.update(req.params.id, req.body)
		.then((user) => {
			if (user) {
				res.status(200).json(user)
			} else {
				res.status(404).json({
					message: "The user could not be found",
				})
			}
		})
		.catch((error) => {
			next(error)
		})
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
