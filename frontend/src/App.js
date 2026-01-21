import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Fields from './pages/Fields';
import Crops from './pages/Crops';
import Productions from './pages/Productions';
import Expenses from './pages/Expenses';
import Reports from './pages/Reports';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/fields" element={<Fields />} />
        <Route path="/crops" element={<Crops />} />
        <Route path="/productions" element={<Productions />} />
        <Route path="/expenses" element={<Expenses />} />
         <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;
