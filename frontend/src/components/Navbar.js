import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
      <Link to="/" style={{ marginRight: '10px' }}>Dashboard</Link>
      <Link to="/fields" style={{ marginRight: '10px' }}>Fields</Link>
      <Link to="/crops" style={{ marginRight: '10px' }}>Crops</Link>
      <Link to="/productions" style={{ marginRight: '10px' }}>Productions</Link>
      <Link to="/expenses" style={{ marginRight: '10px' }}>Expenses</Link>
          <Link to="/reports" style={{ marginRight: '10px' }}>Reports</Link>
           <Link to="/notifications" style={{ marginRight: '10px' }}>Notifications</Link>
      <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  );
}
