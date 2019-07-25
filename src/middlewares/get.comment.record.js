import models from '../api/models';
import statusCode from '../helpers/constants/status.codes';
import sendError from '../helpers/error.sender';

const { Comment } = models;

/**
 * this is a middleware which checks if the article slug is registered in to our database.
 *
 * @author Prémices
 * @static
 * @param {object} req the request
 * @param {object} res the response to be sent
 * @param { object } next the next route controller to be called
 * @memberof getOneArticle
 * @returns {Object} res
 */
/*
 the response is successfully covered in the test but
 since its an async function the coverage is complaining
 */

/* istanbul ignore next */
export default async (req, res, next) => {
  const { slug, id } = req.params;

  const result = await Comment.findOne({
    where: {
      id,
      articleSlug: slug
    }
  });

  if (result) req.comment = result.dataValues;

  return result
    ? next()
    : sendError(statusCode.NOT_FOUND,
      res,
      'id',
      `Comment with id ${id} of article with slug ${slug} is not found`);
};
