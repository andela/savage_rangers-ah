import model from '../../api/models/index';

export default (req, res, status, msgFragment, action) => {
  const { commentId } = req.params;
  const { id } = req.user.user;
  let reactionObject;
  if (action === 'like') {
    reactionObject = {
      userId: id,
      commentId,
      dislikes: 0,
      likes: 1
    };
  } else {
    reactionObject = {
      userId: id,
      commentId,
      dislikes: 1,
      likes: 0
    };
  }
  model.Reaction.create(reactionObject);


  return res.status(status).json({
    status,
    message: msgFragment
  });
};
