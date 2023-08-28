// src/Header.js
import React from 'react';
// Replace with the actual path to your LIC image

const Header = () => {
  return (
    <div className="bg-blue-500 text-white text-center py-4">
      <img src="http://graphicspooja.files.wordpress.com/2014/01/lic-logo.jpg" alt="LIC Logo" className="mx-auto mb-2 w-16" />
      <h1 className="text-2xl font-semibold">Welcome to LIC Payment Gateway</h1>
      <p className="text-sm">Securely make payments for your insurance plans</p>
    </div>
  );
};

export default Header;
