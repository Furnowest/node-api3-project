const express = require('express');
// const postRoute= require("./posts/postRouter");
const userRoute = require("./users/userRouter");


const server = express();

//custom middleware

function logger(req, res, next) {
  const time = new Date().toISOString()
  console.log(`[${time}] ${req.ip} ${req.method} ${req.url}`)
  next()
}


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
// middleware

server.use(express.json())
server.use(logger)

server.use("/user", userRoute)
// server.use("/post", postRoute)

server.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({
    // this is so we dont have to write catch and it will show this msg when something is wrong on server side/ custom error middleware
    message: "Something went wrong, please try again later",
  })
})


module.exports = server;
