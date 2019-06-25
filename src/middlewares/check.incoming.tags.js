import async from 'async';
import models from '../api/models';

const { Tag } = models;

/**
 * A middleware  to check
 * if the current tags already exists
 *
 * @author  Prémices
 * @static
 * @param {object} req the request
 * @param {object} res the response to be sent
 * @param { object } next the next route controller to be called
 * @returns {Object} res, next
 */
export default async (req, res, next) => {
  // Initializing variales
  const firstIndex = 0;
  const { tags } = req.body;
  const upercasedTags = [
    ...new Set(tags.map(singleTag => singleTag
      .charAt(firstIndex)
      .toUpperCase()
      + singleTag.slice(1).toLowerCase()))
  ];

  let currentTag;
  let existingTags = [];

  // Looping the tags array to seperate them
  async.each(upercasedTags,
    async (tag, callback) => {
      currentTag = await Tag.findOne({
        where: {
          name: tag
        }
      });

      // Storing the existing tags in an array
      if (currentTag) {
        existingTags = [...existingTags, currentTag.dataValues];
      }
      callback();
    },
    (result, error) => {
      if (!error) {
        // adding the results in the request object
        req.existingTags = existingTags;
        req.newTags = upercasedTags.filter((tag) => {
          if (!req.existingTags.map(existingTag => existingTag.name).includes(tag)) return tag;
          return false;
        });
        next();
      }
    });
};
