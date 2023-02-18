const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const {connection}=require('./databaseconfig/config')
app.use(
  cors({
    origin: "https://abdelwahebbouden.com",
    credentials: false, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);
app.use(connection())

app.use(express.json());
app.use(cookieParser());
module.exports = app;

