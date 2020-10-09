const userDb = require("../users/userDb")

function validateUserId() {
	return (req, res, next) => {
		userDb.getById(req.params.id)
			.then((user) => {
				if (user) {
					req.user = user
					next()
				} else {
					res.status(404).json({
						message: "User not found",
					})
				}
			})
			.catch((error) => {
				next(error)
			})
	}
}

function validateUser() {
	return (req, res, next) => {
		if (!req.body) {
			return res.status(400).json({
				message: "Missing user userdata",
			})
		}else if(!req.body.name){
			res.status(400).json({
				message: "missing, require name field",
			})
		}else {
			next()
		}

		
	}
}

function validatePost() {
	return (req, res, next) => {
		if (!req.body) {
			return res.status(400).json({
				message: "Missing post data",
			})
		}else if(!req.body.text){
			res.status(400).json({
				message: "missing, require text field",
			})
		}else {
			next()
		}

		
	}
}
module.exports = {
	validateUserId,
	validateUser,
	validatePost,
}
