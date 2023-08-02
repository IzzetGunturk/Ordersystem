import React from 'react';
import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuOrder from './components/menuOrder';

const App = () => {
  return (
    <>
      <Routes>
      <Route path="/" element={<MenuOrder />} />
      </Routes>
    </>
  );
};

export default App;