import async from 'async';
import models from '../api/models';

const { Tag } = models;

/**
 * A middleware  to create the new tags
 *
 * @author  Prémices
 * @static
 * @param {object} req the request
 * @param {object} res the response to be sent
 * @param { object } next the next route controller to be called
 * @returns {Object} res, next
 */
export default async (req, res, next) => {
  let currentTag;
  let newAddedTags = [];

  // Adding new tags to the table then to the article
  async.each(req.newTags,
    async (tag, callback) => {
      // Adding to the table
      currentTag = await Tag.create({
        name: tag
      });

      if (currentTag) {
        newAddedTags = [...newAddedTags, currentTag.dataValues];
      }
      callback();
    },
    (result, error) => {
      if (!error) {
        req.newAddedTags = newAddedTags;
        next();
      }
    });
};
