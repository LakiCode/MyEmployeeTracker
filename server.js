const express = require ('express');

const PORT = process.env.PORT || 3002;
const app = express();
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// test connection
app.get('/', (req, res) => {
    res.json({
      message: 'Hello World'
    });
  });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });