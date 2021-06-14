import React from 'react';

const CommentList = ({comments}) => (

    <>
    {comments.map((comment,key)=>(
        <div className="comment">
        <p key={key}>{comment.username}: {comment.text}</p>
        </div>
    ))}
    </>
);

export default CommentList;