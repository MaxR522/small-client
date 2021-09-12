import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isConnected, setIsConnected] = useState(false);
  const data = localStorage.getItem('currentUser');

  useEffect(() => {
    if (!data) {
      setIsConnected(false);
    } else {
      setIsConnected(true);
    }
  }, [data]);

  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem('currentUser');
    setTimeout(() => {
      window.location.href = '/login';
    }, 500);
  };

  return (
    <nav className='navbar navbar-expand navbar-dark bg-dark'>
      <div className='container-md'>
        {isConnected === false ? (
          <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link className='nav-link text-white' to='/'>
                Home
              </Link>
            </li>
            <li className='nav-item px-4'>
              <Link className='nav-link text-white' to='/login'>
                Login
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='btn btn-outline-success me-2' to='/register'>
                Register
              </Link>
            </li>
          </ul>
        ) : (
          <ul className='navbar-nav ms-auto mb-2 mb-lg-0 '>
            <li className='nav-item px-4'>
              <Link className='nav-link text-white' to='/'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <button
                className='btn btn-outline-danger me-2'
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
