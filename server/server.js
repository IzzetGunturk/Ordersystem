const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const WebSocket = require('ws');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = express();

app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "ordersystem",
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


// set up WebSocket server
const server = app.listen(8082, () => {
  console.log('WebSocket server is listening on port 8082');
});
const wss = new WebSocket.Server({ server });

// function to send updates to all connected clients
function sendUpdatesToClients(updatedData) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(updatedData));
    }
  });
}

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('A client connected.');

  ws.on('message', (message) => {
    console.log('Received message from client:', message);
  });

  ws.on('close', () => {
    console.log('A client disconnected.');
  });
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

      // after inserting the order, fetch the updated list from the database
      const sqlUpdated = 'SELECT * FROM orders';
      db.query(sqlUpdated, (err, updatedData) => {
        if (err) {
          throw err;
        }
        // send updates to all connected clients after inserting an order
        sendUpdatesToClients(updatedData);
      });
    });
});


// show orders
app.get('/orderlist', (req, res) => {
  const sql = "SELECT * FROM orders";
  db.query(sql, (err, data) => {
      if(err) return res.json(err);
      return res.json(data);
  });
});


// delete orders
app.delete('/orderlist/:id', (req, res) => {
  const orderId = req.params.id;
  const sql = 'DELETE FROM orders WHERE id = ?';
  db.query(sql, orderId, (err, result) => {
    if (err) {
      throw err;
    }
    
    // after deletion, fetch the updated order list and send it as the response
    const sqlUpdated = 'SELECT * FROM orders';
    db.query(sqlUpdated, (err, updatedData) => {
      if (err) {
        throw err;
      }
      res.json(updatedData);

      // send updates to all connected clients after deleting an order
      sendUpdatesToClients(updatedData);
    });
  });
});


// login
const generateSecretKey = () => {
  return crypto.randomBytes(64).toString('hex');
};

const secretKey = generateSecretKey();

app.post('/login', express.json(), (req, res) => {
  const { username, password } = req.body;

  // fetch the user from the database based on the provided username
  const sql = 'SELECT * FROM login WHERE username = ?';
  db.query(sql, [username], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching user from database.' });
    }

    if (result.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    // compare the provided password with the password from the database
    const user = result[0];
    if (user.password === password) {
      // Create a JWT token
      const token = jwt.sign({ username: user.username }, secretKey, {
        expiresIn: '1h', // Token expires in 1 hour
      });
      return res.json({ message: 'Login successful!', token });
    } else {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }
  });
});

app.listen(8081, () => {
  console.log("listening")
});
