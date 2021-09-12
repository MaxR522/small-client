import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import axios from 'axios';

// validation schema
const signupSchema = yup.object().shape({
  fullname: yup.string().required('nom et prenom necessaire'),
  email: yup
    .string()
    .email('email doit etre valide')
    .required('email necessaire'),
  password: yup
    .string()
    .required('password necessaire')
    .min(6)
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/,
      'Password doit contenir 6 characteres, majuscules, minuscules, chiffres'
    ),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = handleSubmit((data) => {
    axios
      .post('/users/register', data)
      .then((result) => {
        if (result.status === 201) {
          localStorage.setItem(
            'currentUser',
            JSON.stringify({
              data: result.data.user,
              token: result.data['access-token'],
            })
          );
          alert('Register reussit !');
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
      <h1 className='pt-4'>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='pt-3'>
        <div className='mb-3'>
          <label htmlFor='fullname' className='form-label'>
            nom et prenom:
          </label>

          <input
            type='text'
            id='fullname'
            className='form-control'
            placeholder='votre nom et prenom'
            {...register('fullname')}
          />

          <span className='form-text text-danger'>
            {errors.fullname?.message}
          </span>
        </div>

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

        <input type='submit' className='btn btn-primary mb-3' value='Submit' />
      </form>
    </div>
  );
};

export default Register;
