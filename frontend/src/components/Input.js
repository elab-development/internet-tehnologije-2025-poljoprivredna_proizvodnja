import React from 'react';

export default function Input({ label, value, onChange, type = 'text' }) {
  return (
    <div>
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} />
    </div>
  );
}
