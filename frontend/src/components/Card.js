import React from 'react';

const Card = ({ title, children }) => {
  return (
    <div className="border rounded p-4 shadow mb-4">
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      {children}
    </div>
  );
};

export default Card;
