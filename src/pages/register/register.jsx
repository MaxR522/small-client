import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import axios from 'axios';

// validation schema
const signupSchema = yup.object().shape({
  fullname: yup.string().required('fullname necessaire'),
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
          <label htmlFor='fullname'>nom et prenom:</label>

          <input
            type='text'
            id='fullname'
            placeholder='votre nom et prenom'
            {...register('fullname')}
          />

          <small>{errors.fullname?.message}</small>
        </div>

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

export default Register;
