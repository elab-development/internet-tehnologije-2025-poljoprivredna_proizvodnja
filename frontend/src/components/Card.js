import React from 'react';

export default function Card({ title, children }) {
  return (
    <div style={{ 
      border: '1px solid #ccc', 
      padding: '15px', 
      margin: '10px 0', 
      borderRadius: '5px',
      boxShadow: '2px 2px 5px rgba(0,0,0,0.1)'
    }}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}
