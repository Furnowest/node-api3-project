// code away!
const server = require("./server")


const port =process.send.PORT||5000



server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})