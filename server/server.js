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

// add orders
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

// show orders
app.get('/orderlist', (req, res) => {
  const sql = "SELECT * FROM orders";
  db.query(sql, (err, data) => {
      if(err) return res.json(err);
      return res.json(data);
  })
})

// delete orders
app.delete('/orderlist/:id', (req, res) => {
  const orderId = req.params.id;
  const sql = 'DELETE FROM orders WHERE id = ?';
  db.query(sql, orderId, (err, result) => {
    if (err) {
      throw err;
    }
    
    // After deletion, fetch the updated order list and send it as the response
    const sqlUpdated = 'SELECT * FROM orders';
    db.query(sqlUpdated, (err, updatedData) => {
      if (err) {
        throw err;
      }
      res.json(updatedData);
    });
  });
});

app.listen(8081, () => {
  console.log("listening")
});
