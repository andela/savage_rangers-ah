import switchCommentReaction from '../validators/switchCommentReaction';
import status from '../constants/status.codes';

export default async (req, res, next, action) => {
  const { commentId } = req.params;
  const { id } = req.user.user;
  let whereObject;
  let where;
  let msg;

  if (action === 'hasDisliked') {
    whereObject = {
      commentId: Number(commentId),
      userId: id,
      dislikes: 1,
      likes: 0
    };
    where = { dislikes: 0, likes: 1 };
    msg = 'liked';
  } else {
    whereObject = {
      commentId: Number(commentId),
      userId: id,
      dislikes: 0,
      likes: 1
    };
    where = { dislikes: 1, likes: 0 };
    msg = 'disliked';
  }

  const didReact = await switchCommentReaction(whereObject,
    where,
    status.OK,
    `You have successfully  ${msg} this comment`);
  /* istanbul ignore next  */
  if (didReact === false) {
    next();
  } else {
    res.status(status.OK).json(didReact);
  }
};
