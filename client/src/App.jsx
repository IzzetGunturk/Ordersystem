import React from 'react';
import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuOrder from './components/menuOrder';
import LoginPage from './components/loginPage';
import Header from './layout/header';

const App = () => {
  return (
    <>
      <Header/>
      <Routes>
      <Route path="/" element={<MenuOrder />} />
      <Route path="/orderlist" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default App;