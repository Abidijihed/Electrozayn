const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
const crypto = require('crypto');

const cors = require("cors");
const {userRoter}=require('./router/userRouter')
 const {PosteRouter}=require('./router/router')
app.use(
  cors({
    origin: "*",
    // origin:"http://www.localhost:3000",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);


app.use(express.json());
app.use(cookieParser());

app.use('/',userRoter)

app.use('/',PosteRouter)
module.exports = app;

