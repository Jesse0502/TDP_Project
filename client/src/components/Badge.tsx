import React from 'react';

const Badge = ({ children }) => {
  return (
    <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs font-bold transition-all">
      {children}
    </span>
  );
};

export default Badge;
