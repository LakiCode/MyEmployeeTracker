const express = require("express");
const inquirer = require('inquirer');
const db = require ('./db/connections');
const PORT = process.env.PORT || 3002;
const app = express();
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// test connection
app.get("/api/employee", (req, res) => {
  const sql = `SELECT * FROM employee`;
  // create query
  db.query(sql, (err, rows) => {
    // check for error
    if (err) {
      res.status(500).json({ error: err.message });
      // empty return to stop process
      return;
    }
    // server need to retur data if no error
    res.json({
      message:"success",
      data:rows
    });
  });
});

// get a single employee


//Infinity()

// function init
// function to loaf main promnt

// function to view employees
//make query

// function  to view employees by deparment
//make query

// function to view  employee as manager
//query to view employee

// function remove empoloee
// query Delete employee

// function update employee role
 // query to update employee role

 // function to exit

// start swerver
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


