import React, { useState, useEffect } from 'react'
import OrderListPizzeria from './ordersListPizzeria';

function LoginPage() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [wrongPasswordAlert, setWrongPasswordAlert] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);
  
  // login button
  const handleLogin = async () => {
    // form
    event.preventDefault();
    
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
        setWrongPasswordAlert('Wrong credentials, try it again!')
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  // logout button
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    setUsername('');
    setPassword('');
    setWrongPasswordAlert('');
    setLoggedIn(false);
  };
    
  // if not logged in
  if (!loggedIn) {
    return (
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-28 sm:px-6 lg:px-8">
          <div className="mx-auto">
            <form className="mt-6 mb-0 space-y-4 rounded-lg p-4 shadow-xl sm:p-6 lg:p-8 mx-auto max-w-lg bg-white">
              <h1 className="text-center text-2xl font-bold text-primary sm:text-3xl">
                Login to database
              </h1>
              <div>
                <div className="flex flex-col">
                  <input 
                  type='text'
                  value={username}
                  placeholder='Username' 
                  className='mx-auto p-2 m-5 w-48 border border-gray-300 rounded-md'
                  onChange={(e) => setUsername(e.target.value)}>
                  </input>
                  <input 
                  type='password'
                  value={password} 
                  placeholder='Password' 
                  className='mx-auto p-2 w-48 border border-gray-300 rounded-md'
                  onChange={(e) => setPassword(e.target.value)}>
                  </input>
                  <button 
                  className='mx-auto px-4 py-2 m-5 w-20 bg-yellow-500 hover:bg-yellow-300 transition duration-200 text-white rounded-md cursor-pointer'
                  onClick={handleLogin}>
                    Login
                  </button>
                  <p className='mx-auto text-red-600'>{wrongPasswordAlert}</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <div>
        <div className='flex justify-end px-8 py-5'>
          <button className='px-4 py-2 bg-red-500 hover:bg-red-400 transition duration-200 text-white rounded-md' onClick={handleLogout}>Logout</button>
        </div>
        <OrderListPizzeria/>
      </div>
    );
  }
}

export default LoginPage;