const e = require("express");
const express = require("express");
const inquirer = require("inquirer");
const { values } = require("mysql2/lib/constants/charset_encodings");
const { NULL } = require("mysql2/lib/constants/types");
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
        viewAllEmployeesByMgmt();
      } else if (choice.menuList === "Add Employee") {
        AddEmployee();
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
 
  db.query(`SELECT e.first_name AS Firts_Name
  , e.last_name AS Last_Name
  , r.title AS Title
  , r.salary AS Salary
  , d.depName AS Department_Name
  FROM employee e
   INNER JOIN role r
   ON e.role_id = r.id
   left outer join department d
   on r.department_id = d.id  `, function (err, rows) {
 
    console.table(rows);
    menuOptions();
  });
}

// function  to view employees by deparment
function viewAllEmployeesByDep () {
  console.log(`
  ****** View Employees by Department *******
 `)
 // Query database
db.query('SELECT * FROM department', function (err, res) {
 
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
    db.query(`SELECT e.first_name AS Firts_Name
    , e.last_name AS Last_Name
    , r.title AS Title
    , d.depName AS Department_Name
    FROM employee e
     INNER JOIN role r
     ON e.role_id = r.id
     left outer join department d
     on r.department_id = d.id  
     WHERE depName = ?`, choice.department, function (err,res) {


      console.table(res);
      menuOptions();
    })
  }
  )

});
}

// function to view  employee by manager
function viewAllEmployeesByMgmt () {
  console.log(`
  ****** View Employees by Manager *******
 `)
 // Query database
db.query(`SELECT id, CONCAT_WS(" ", first_name, last_name) AS full_name 
        FROM employee WHERE manager_id IS NULL`, function (err, res) {
 
  const mngArray = res.map(manager =>{
    return ({
          name: manager.full_name,
          id: manager.id
       })
      })
  
  inquirer.prompt([
    {
      type:'list',
      name:'manager',
      id: 'id',
      message: "Select Manager to view Empolyees",
      choices: mngArray
    }
  ])
  .then((choice) => {
    console.log(choice.id)
    console.log(choice.manager, "is a manager for list of employees:" );
    db.query(`SELECT e.first_name AS Firts_Name
    , e.last_name AS Last_Name
    FROM employee e
     INNER JOIN role r
     ON e.role_id = r.id
     left outer join department d
     on r.department_id = d.id  
     WHERE depName = ?`, choice.manager, function (err,res) {


      console.table(res);
      menuOptions();
    })
  }
  )

});
}

// function add employee
function AddEmployee () {
  db.query('SELECT id, title FROM role', function (err, res){
    const roleArray = res.map(role =>{
      return ({
            name:role.title,
            value:role.id
         })
        })

        db.query(`SELECT id, CONCAT_WS(" ", first_name, last_name) AS full_name 
        FROM employee WHERE manager_id IS NULL `, function (err, res) {
 
  const mngArray = res.map(manager =>{
    return ({
          name: manager.full_name,
          value: manager.id
       })
      })
    
  console.log(mngArray)
  inquirer.prompt([
    {
      type:'input',
      name:'first_name',
      message: "Enter Employee First Name",
    },
    {
      type:'input',
      name:'last_name',
      message: "Enter Employee Last Name",
    },
    {
          type:'list',
          name:'role_id',
          message: "Select role for Employee",
          choices: roleArray
       },
       {
        type:'list',
        name:'manager_id',
        message: "Select Manager for Employee",
        choices: mngArray
        
     }
  ])
  .then ((newEmployee) => {
    console.log(newEmployee)
    db.query('INSERT INTO employee SET ?', newEmployee, function(err){
      if (err) {
        console.log(err)
        return
      } else {
        console.log('New Employee added in to database')
      }
    });
  });
  });
});
}


// function remove empoloee
// query Delete employee

// function update employee role
// query to update employee role

// function to exit

// function remove empoloee
// query Delete employee

// function update employee role
// query to update employee role

// function to exit

// start swerver
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
