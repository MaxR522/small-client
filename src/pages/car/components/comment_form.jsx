import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import axios from 'axios';

// validation schema
const commentSchema = yup.object().shape({
  content: yup.string().required('le contenue ne peut pas etre vide'),
});

const CommentForm = ({ carId, author, token }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(commentSchema),
  });

  const onSubmit = handleSubmit((data) => {
    data.carId = carId;
    data.author = author;

    axios({
      method: 'post',
      url: '/comments',
      data,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((result) => {
        if (result.status === 201) {
          setTimeout(() => window.location.reload(), 1000);
        } else {
          // toast.error(result.data.message, toastStyle);
          console.error(result.data);
        }
      })
      .catch((error) => {
        // toast.error(e.response.data.message, toastStyle);
        console.error(error.response);
      });
  });

  return (
    <div className='mt-5'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-3'>
          <label htmlFor='content' className='form-label'>
            Ecrire un commentaire:
          </label>

          <textarea
            id='content'
            className='form-control'
            placeholder='votre commentaire'
            {...register('content')}
          />

          <small>{errors.content?.message}</small>
        </div>

        <input
          type='submit'
          value='Commenter'
          className='btn btn-primary mb-3'
        />
      </form>
    </div>
  );
};

export default CommentForm;
