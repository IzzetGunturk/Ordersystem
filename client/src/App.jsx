import React from 'react';
import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuOrder from './components/menuOrder';
import LoginPage from './components/loginPage';

const App = () => {
  return (
    <>
      <Routes>
      <Route path="/" element={<MenuOrder />} />
      <Route path="/orderlist" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default App;