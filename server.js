const express = require("express");
const inquirer = require("inquirer");
require('console.table');
const db = require('./db/connections');
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
      message: "success",
      data: rows,
    });
  });
});

// get a single employee

// first load menu
// function manuOptions
// create inquirer menu list
function menuOptions() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Select option from Menu:",
        name: "menuList",
        choices: [
          "View All Employees",
          "View All Employees by Department",
          "View All Employees by Manager",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          "Update Employee Manager",
          "Delete database",
          "Exit Application",
        ],
      },
    ])
    .then((choice) => {
      if (choice.menuList === "View All Employees") {
        viewAllEmployees();
      } else if (choice.menuList === "View All Employees by Department") {
        viewAllEmployeesByDep();
      } else if (choice.menuList === "View All Employees by Manager") {
        console.log("call function viewAllEmployeesByMgmt");
      } else if (choice.menuList === "Add Employee") {
        console.log("call function Add Employee");
      } else if (choice.menuList === "Remove Employee") {
        console.log("call function RemoveEmpoyee");
      } else if (choice.menuList === "Update Employee Role") {
        console.log("call function UpdateEmpRole");
      }else if (choice.menuList === "Update Employee Manager") {
        console.log("call function UpdateEmpMngr");
      }else if (choice.menuList === "Delete database") {
        console.log("call function Delete database");
      }else if (choice.menuList === "Exit") {
        console.log("call function exit");
      }
    });
}

// call menu function
menuOptions();

// function to view employees
function viewAllEmployees() {
  console.log(`
   ****** Employees *******
  `)
 
  db.query("SELECT * FROM employee", function (err, rows) {
    // if(err !== null)
    // {
     
    //   console.table(rows);
    //   menuOptions();
    // } else
    // {
    //   console.log (err)
    //   console.log("Error: table Empolyees not exist or is empty!" )
    //   // empty return to stop process 
    //   return menuOptions();
    // }
    console.table(rows);
    
  });
}

// function  to view employees by deparment
function viewAllEmployeesByDep () {
  console.log(`
  ****** View Employees by Department *******
 `)
 // Query database
db.query('SELECT * FROM department', function (err, res) {
  console.log(res);
  const depArray = res.map(department =>{
    return ({
          name: department.depName
       })
      })
  console.log (depArray.depName)
  inquirer.prompt([
    {
      type:'list',
      name:'department',
      message: "Select department to view Empolyees",
      choices: depArray
    }
  ])
  .then((choice) => {
    console.log("You selected: ", choice.department );
    db.query('SELECT * FROM department WHERE depName = ?', choice.department, function (err,res) {
      console.table(res);
    })
  }
  )

});
}

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
