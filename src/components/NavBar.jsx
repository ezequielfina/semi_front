import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/logo.png';

function Navbar() {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/bloq-portal', label: 'Portales' },
    { to: '/preferencias', label: 'Preferencias' },
    { to: '/config', label: 'Config' },
  ];

  return (
    <nav className="flex items-center justify-center px-6 py-4 bg-white shadow-md sticky top-0 z-50">

      {/* Links */}
      <div className="flex gap-6 justify-between">
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`text-gray-700 hover:text-blue-500 transition-colors font-medium 
              ${location.pathname === link.to ? 'text-blue-600 underline' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
