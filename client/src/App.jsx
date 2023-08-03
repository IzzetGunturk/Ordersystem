import React from 'react';
import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuOrder from './components/menuOrder';
import OrdersListPizzeria from './components/ordersListPizzeria'

const App = () => {
  return (
    <>
      <Routes>
      <Route path="/" element={<MenuOrder />} />
      <Route path="/orderlist" element={<OrdersListPizzeria />} />
      </Routes>
    </>
  );
};

export default App;