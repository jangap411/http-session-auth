/*
app taken from
https://dev.to/edemagbenyo/nodejs-authentication-with-cookies-and-session-part-2-2752
*/
const http = require('http')
const express = require("express");
const morgan = require('morgan')
const auth = require('./auth');
// const { Router } = require('express');
// const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const app = express();
const port = 3001;


app.use(morgan('dev'))

// app.use(cookieParser('abcdef-12345'))
app.use(session({
  name: 'session-id',
  secret:'123456xxx',
  saveUninitialized:false,
  resave:false,
  store:new FileStore()
}))

app.get('/', (req,res)=>{
  res.statusCode=200
  res.send("welcome to the express app!")
})

//add auth middleware
app.use(auth)
app.get("/secret", (req, res) => {
  res.statusCode = 200;
  res.send("**************");
});


const server = http.createServer(app)

server.listen(port,'localhost',()=>{
  console.log(`server is live @ http://localhost:${port}/`)
})
/*
-Route
  route
*/