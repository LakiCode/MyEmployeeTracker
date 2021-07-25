
const mysql = require("mysql2");


// Connect to mysql database
const db = mysql.createConnection(
    {
      host: "localhost",
      // mysql user connection credentials
      user: "root",
      password: "root",
      database: "my_employee",
    },
    console.log("Connected to the my Employee database.")
  );

  module.exports = db;

