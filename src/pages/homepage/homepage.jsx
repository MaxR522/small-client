import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Homepage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios
      .get('/cars')
      .then((result) => setCars(result.data.cars))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className='container-fluid d-flex flex-wrap p-4'>
      {cars.map((element) => {
        return (
          <div
            key={`${element.brand}${element._id}`}
            className='card m-2'
            style={{ width: '18rem' }}
          >
            <img src={element.photo} className='card-img-top' alt='car' />
            <div className='card-body'>
              <h5 className='card-title'>{element.brand}</h5>
              <p className='card-text'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
                libero!
              </p>
              <a href={`/car/${element._id}`} className='btn btn-primary'>
                Commenter
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Homepage;
