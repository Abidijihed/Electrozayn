const app = require("./server/index");
const express = require("express")
const port = 5500;
const path = require("path");
const cookieParser = require('cookie-parser');

app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, './client/build')));

app.get('/', (req, res) => {
 
  res.send(path.resolve(__dirname, './client/build', 'index.html'));
});

app.listen(port,() => {
  console.log(` Backend server is running!  http://localhost:${port}`);
});