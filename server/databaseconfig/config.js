const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "167.172.191.37",
  user: "nada",
  port: 5300,
  password: "$nada123456",
  database: "electrozayn_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});
module.exports = { connection };