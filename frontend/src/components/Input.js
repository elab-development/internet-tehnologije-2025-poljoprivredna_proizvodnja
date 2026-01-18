import React from 'react';

const Input = ({ label, value, onChange, type = 'text', placeholder }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border px-3 py-2 rounded w-full"
      />
    </div>
  );
};

export default Input;
