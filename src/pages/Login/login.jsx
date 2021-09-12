import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import axios from 'axios';

// validation schema
const loginSchema = yup.object().shape({
  email: yup.string().required('email necessaire'),
  password: yup.string().required('password necessaire'),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = handleSubmit((data) => {
    axios
      .post('/users/login', data)
      .then((result) => {
        if (result.status === 200) {
          localStorage.setItem(
            'currentUser',
            JSON.stringify({
              data: result.data.user,
              token: result.data['access-token'],
            })
          );
          alert('Login reussit !');
          setTimeout(() => (window.location.href = '/'), 1000);
        } else {
          console.error(result.data);
        }
      })
      .catch((error) => {
        console.error(error.response);
        alert(error.response.data.message);
      });
  });

  return (
    <div className='container d-flex flex-column justify-content-center align-items-center'>
      <h1 className='pt-4'>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='pt-5'>
        <div className='mb-3'>
          <label htmlFor='femail' className='form-label'>
            Email:
          </label>

          <input
            type='email'
            id='femail'
            className='form-control'
            placeholder='votre email'
            {...register('email')}
          />

          <small className='form-text text-danger'>
            {errors.email?.message}
          </small>
        </div>
        <div className='mb-3'>
          <label htmlFor='fpassword' className='form-label'>
            Password:
          </label>

          <input
            type='password'
            id='fpassword'
            className='form-control'
            placeholder='votre mot de passe'
            {...register('password')}
          />

          <small className='form-text text-danger'>
            {errors.password?.message}
          </small>
        </div>

        <input type='submit' value='Submit' className='btn btn-primary mb-3' />
      </form>
    </div>
  );
};

export default Login;
