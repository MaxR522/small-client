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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='content'>Contenue:</label>

          <textarea
            id='content'
            placeholder='votre commentaire'
            {...register('content')}
          />

          <small>{errors.content?.message}</small>
        </div>

        <input type='submit' value='Commenter' />
      </form>
    </div>
  );
};

export default CommentForm;
