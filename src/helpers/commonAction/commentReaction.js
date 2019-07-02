import status from '../constants/status.codes';
import model from '../../api/models/index';

const { Reaction } = model;
export default async (req, res, next, reaction) => {
  const { commentId } = req.params;
  const { id } = req.user.user;
  let msg;
  const where = {
    commentId,
    userId: id
  };

  if (reaction === 'liked') {
    where.likes = 1;
    msg = 'liked';
  } else {
    where.dislikes = 1;
    msg = 'disliked';
  }


  const hasReacted = await Reaction.findOne({ where });

  if (hasReacted) {
    return res.status(status.BAD_REQUEST).json({
      status: status.BAD_REQUEST,
      message: `You have already ${msg} this comment!`
    });
  }
  next();
};
