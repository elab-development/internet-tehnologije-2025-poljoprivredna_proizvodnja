import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Fields from './pages/Fields';
import Crops from './pages/Crops';
import Productions from './pages/Productions';
import Expenses from './pages/Expenses';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/fields" element={<Fields />} />
        <Route path="/crops" element={<Crops />} />
        <Route path="/productions" element={<Productions />} />
        <Route path="/expenses" element={<Expenses />} />
      </Routes>
    </Router>
  );
}

export default App;
