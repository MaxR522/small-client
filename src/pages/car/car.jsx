import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CommentList from './components/comment_list';

const Car = () => {
  const [car, setCar] = useState({});
  const id = window.location.pathname.split('/')[2];

  useEffect(() => {
    axios
      .get(`/cars/${id}`)
      .then((result) => setCar(result.data.car))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <div className='container-fluid d-flex flex-wrap justify-content-evenly'>
      <div
        key={`${car.brand}${car._id}`}
        className='card m-2'
        style={{ width: '18rem' }}
      >
        <img src={car.photo} className='card-img-top' alt='car' />
        <div className='card-body'>
          <h5 className='card-title'>{car.brand}</h5>
          <p className='card-text'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
            libero!
          </p>
        </div>
      </div>
      <div>
        <h1>Commentaires:</h1>
        <CommentList carId={car._id} />
      </div>
    </div>
  );
};

export default Car;
