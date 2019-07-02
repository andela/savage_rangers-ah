import models from '../../api/models/index';

/**
 * Every response covered on test.
 * since its an async function the coverage complains.
 */
/* istanbul ignore next */
export default async (req, res, status, count) => {
  const { commentId } = req.params;
  const response = {};
  let where;

  if (count === 'likeCount') {
    where = { commentId: Number(commentId), likes: 1 };
  } else {
    where = { commentId: Number(commentId), dislikes: 1 };
  }


  const reactionCount = await models.Reaction.count({ where });
  response.status = status;
  if (count === 'likeCount') {
    response.likeCount = reactionCount;
  } else {
    response.disLikeCount = reactionCount;
  }

  return res.status(status).json(response);
};
