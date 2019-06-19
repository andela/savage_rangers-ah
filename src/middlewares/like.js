import errorSender from '../helpers/error.sender';
import status from '../helpers/constants/status.codes';
import models from '../api/models/index';

export default async (req, res, next) => {
  const { id } = req.params;
  const { reaction } = req.query;
  if (reaction === 'like' || reaction === 'dislike') {
    const { Article } = models;
    const article = await Article.findOne({
      where: {
        id
      }
    });
    if (article) {
      req.data = {
        articleId: id,
        userId: req.user.id,
        reaction
      };
      return next();
    }
    errorSender(status.NOT_FOUND, res, reaction, 'The article is not found, please provide a valid ID');
  }
  errorSender(status.BAD_REQUEST, res, 'URL parameters', 'The action is required, either like or dislike');
};
