import React, { useState, useEffect } from 'react';
import CommentForm from './comment_form';
import CommentBox from './comment_box';
import axios from 'axios';

const CommentList = ({ carId }) => {
  const [comments, setComments] = useState([]);
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  const data = localStorage.getItem('currentUser');
  useEffect(() => {
    if (!data) {
      return (window.location.href = '/login');
    } else {
      axios({
        method: 'get',
        url: `/cars/${carId}/comments`,
        headers: { Authorization: `Bearer ${JSON.parse(data).token}` },
      })
        .then((result) => {
          if (result.status === 200) {
            setComments(result.data.comments);
            setLoading(false);
          } else {
            // toast.error(result.data.message, toastStyle);
            console.error(result.data);
          }
        })
        .catch((error) => {
          // toast.error(e.response.data.message, toastStyle);
          console.error(error.response);
        });

      setUserData(JSON.parse(data).data);
      setToken(JSON.parse(data).token);
    }
  }, [carId, data]);

  return (
    <>
      {loading
        ? 'loading...'
        : comments.map((element) => {
            return (
              <CommentBox
                key={`${element._id}${element.author}`}
                author={element.author}
                content={element.content}
                createdAt={element.createdAt}
              />
            );
          })}

      <CommentForm carId={carId} author={userData.fullname} token={token} />
    </>
  );
};

export default CommentList;
