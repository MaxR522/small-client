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
    <>
      {isConnected === false ? (
        <ul>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/register'>Register</Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      )}
    </>
  );
};

export default Navbar;
