const Comment = ({ user, comment }) => {
  return (
    <div>
      <span>{user}</span>
      <span>{comment}</span>
    </div>
  );
};

export default Comment;
