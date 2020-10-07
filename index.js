// code away!

const express = require("express")
const logger = require("./middleware/logger")
const usersRouter = require("./users/users-router")

const server = express()
const port = 4000

server.use(express.json())
server.use(logger("long"))

server.use(usersRouter)

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong, please try again later",
	})
})

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})