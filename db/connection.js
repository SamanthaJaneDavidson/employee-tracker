const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  // Your username
  user: "root",
  // Your password
  password: "root",
  database: "employees_db"
});

connection.connect(function (err) {
  if (err) console.log(err);
});

module.exports = connection;
