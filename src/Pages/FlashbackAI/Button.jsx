import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-[#7c602e] text-white hover:bg-[#634d25]',
    secondary: 'bg-white border border-gray-200 text-gray-800 hover:bg-gray-50',
  };
  
  return (
    <button 
      className={`px-8 py-3 rounded-full font-medium transition-all active:scale-95 shadow-sm ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};