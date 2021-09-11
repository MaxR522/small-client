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
    <>
      <h1>{car.brand}</h1>
      <img src={car.photo} alt='car' />
      <CommentList carId={car._id} />
    </>
  );
};

export default Car;
