const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
// const {PosteRouter}=require('./router/router')
app.use(
  cors({
    origin: "https://abdelwahebbouden.com",
    credentials: false, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);
// app.use('/',PosteRouter)

app.use(express.json());
app.use(cookieParser());
module.exports = app;

