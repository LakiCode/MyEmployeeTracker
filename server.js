const express = require ('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3002;
const app = express();
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Connect to mysql database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // mysql user connection credentials
        user: 'root', password: 'root',
        database: 'my_employee'
    },
    console.log('Connected to the my Employee database.')
);

// test connection
app.get('/', (req, res) => {
    res.json({
      message: 'Hello World'
    });
  });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });