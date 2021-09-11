import React from 'react';

const CommentBox = ({ author, content }) => {
  return (
    <div>
      <h3>{author}</h3>
      <p>{content}</p>
    </div>
  );
};

export default CommentBox;
