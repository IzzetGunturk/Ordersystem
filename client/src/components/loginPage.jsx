import React, { useState } from 'react'
import OrderListPizzeria from './ordersListPizzeria';

function LoginPage() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      if (response.ok) {
        const data = await response.json();
        const { token } = data;
        localStorage.setItem('token', token); 
        setLoggedIn(true);
      } else {
        // wrong password
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    setUsername('');
    setPassword('');
    setLoggedIn(false);
  };
    

  if (!loggedIn) {
    return (
      <div>
        <h2>Login</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Welcome, {username}!</h2>
        <button onClick={handleLogout}>Logout</button>
        <OrderListPizzeria/>
      </div>
    );
  }
}

export default LoginPage;