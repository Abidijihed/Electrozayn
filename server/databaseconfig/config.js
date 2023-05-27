const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "142.93.162.155",
  user: "nada",
  port: 5300,
  password: "$nada123456",
  database: "electrozayn_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "nada123",
//   database: "electrozayn_db",
// });

// connection.connect((err) => {
//   if (err) throw err;
//   console.log("Connected!");
// });
module.exports = { connection };