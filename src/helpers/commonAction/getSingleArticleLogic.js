import errorSender from '../error.sender';
import errorMessage from '../constants/error.messages';
import model from '../../api/models/index';


const { Read } = model;
export default async (req, res, article, status) => {
  if (article) {
    // count registered users
    if (req.user) {
      await Read.findOrCreate({
        where: {
          userId: req.user.id || req.user.user.id,
          articleSlug: article.slug
        }
      });
    } else {
      // count unregistered users
      await Read.findOrCreate({
        where: {
          userAgent: req.headers['user-agent'],
          userIp: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
          articleSlug: article.slug
        }
      });
    }

    res.status(status.OK).json({
      status: 200,
      article
    });
  } else {
    errorSender(status.NOT_FOUND, res, 'Article', errorMessage.noArticles);
  }
};
