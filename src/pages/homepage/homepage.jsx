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

  const handleClick = (e) => {
    e.preventDefault();

    axios.get('/cars/populate').then((result) => {
      if (result.status === 200) {
        window.location.reload();
      } else {
        alert(result.data);
      }
    });
  };

  return (
    <>
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
      <div className='d-flex justify-content-center'>
        <button
          onClick={handleClick}
          className='btn btn-outline-dark btn-lg mb-4'
        >
          Remplir de vehicules
        </button>
      </div>
    </>
  );
};

export default Homepage;
