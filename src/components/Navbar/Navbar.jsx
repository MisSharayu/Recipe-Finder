import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/main.png';

const Navbar = () => {
  return (
    <div className="navbar bg-white text-black shadow-md px-4 py-3 w-full flex flex-col sm:flex-row sm:justify-between items-center">

      <div className='flex gap-2'>
        <h1 className="text-2xl font-[Magneto] uppercase text-center sm:text-left">
          Recipes Hub
        </h1>
        <img
          src={logo}
          alt="Logo"
          className="w-10 h-8"
        />
      </div>

      <ul className="flex space-x-6 font-semibold justify-center sm:justify-end mt-2 sm:mt-0">
        <li>
          <Link to="/" className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faHome} />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/favorites" className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faHeart} className='text-red-500' />
            <span>Favorites</span>
          </Link>
        </li>
      </ul>

    </div>
  );
};

export default Navbar;