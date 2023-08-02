const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: 'pizzaordersystem',
    charset: 'utf8mb4'
});

db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('Database connected!');
});

app.get('/', (req, res) => {
    return res.json("From backend side");
});

app.post('/orders', express.json(), (req, res) => {
    const { pizzaName, pizzaPrice, tableNumber} = req.body;
    const order = { pizzaName, pizzaPrice, tableNumber };
  
    const sql = 'INSERT INTO orders SET ?';
    db.query(sql, order, (err, result) => {
      if (err) {
        throw err;
      }
      res.json({ message: 'Order placed successfully!' });
    });
});

app.listen(8081, () => {
  console.log("listening")
});
