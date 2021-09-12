import React from 'react';

const CommentBox = ({ author, content, createdAt }) => {
  return (
    <div>
      <div className='card' style={{ width: '18rem' }}>
        <div className='card-body'>
          <h5 className='card-title'>{author}</h5>
          <h6 className='card-subtitle mb-2 text-muted'>
            {createdAt ? new Date(createdAt).toDateString() : ''}
          </h6>
          <p className='card-text'>{content}</p>
        </div>
      </div>
      {/* <h3>{author}</h3>
      <p>{content}</p> */}
    </div>
  );
};

export default CommentBox;
