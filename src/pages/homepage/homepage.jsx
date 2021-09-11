import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios
      .get('/cars')
      .then((result) => setCars(result.data.cars))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {cars.map((element) => {
        return (
          <Link
            to={`/car/${element._id}`}
            key={`${element.brand}${element._id}`}
          >
            <h1>{element.brand}</h1>
            <img src={element.photo} alt='car' />
          </Link>
        );
      })}
    </>
  );
};

export default Homepage;
