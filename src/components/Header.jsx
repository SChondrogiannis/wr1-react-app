import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import siteConfig from '../assets/siteConfig.json';

const Header = () => {

  const location = useLocation(); 

  const getNavLinkClass = (path) => {
    return location.pathname === path ? 'text-white bg-black px-4 py-2 rounded-md' : 'text-gray-600 hover:text-blue-500';
  };

  return (

  <header className="flex justify-between items-center p-6 bg-white shadow-md">
    <div className="text-2xl font-bold text-gray-800 pl-4">
      <Link to="/" className="hover:text-blue-500">{siteConfig.siteName}</Link>
    </div>
    <nav>
      <ul className="hidden md:flex space-x-6  pr-4">
        <li>
          <Link to="/" className={getNavLinkClass('/')}>Home</Link>
        </li>
        <li>
          <Link to="/contact" className={getNavLinkClass('/contact')}>Contact</Link>
        </li>
      </ul>
    </nav>
    <div className="md:hidden  pr-4"> 
      <button className="text-gray-600 focus:outline-none hover:text-blue-500">
        <img src="/static-menu-icon.svg" alt="Menu Icon" className="w-12 h-12" />
      </button>
    </div>
  </header>

  );
};

export default Header;