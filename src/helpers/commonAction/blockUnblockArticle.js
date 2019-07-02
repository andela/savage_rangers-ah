import models from '../../api/models/index';
import status from '../constants/status.codes';

const { Article } = models;

export default (req, res, isBlocked, msgFragment) => {
  const { slug } = req.params;
  const { title, body } = req;

  Article.update({
    isBlocked
  },
  {
    where: {
      slug
    }
  });
  return res.status(status.OK).json({
    status: status.OK,
    message: `${slug} ${msgFragment}`,
    data: {
      title,
      slug,
      body
    }
  });
};
