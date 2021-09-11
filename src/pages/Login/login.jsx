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
          setTimeout(() => (window.location.href = '/'), 3000);
        } else {
          console.error(result.data);
        }
      })
      .catch((error) => {
        console.error(error.response);
      });
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='femail'>Email:</label>

          <input
            type='email'
            id='femail'
            placeholder='votre email'
            {...register('email')}
          />

          <small>{errors.email?.message}</small>
        </div>
        <div>
          <label htmlFor='fpassword'>Password:</label>

          <input
            type='password'
            id='fpassword'
            placeholder='votre mot de passe'
            {...register('password')}
          />

          <small>{errors.password?.message}</small>
        </div>

        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default Login;
