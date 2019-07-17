import _ from 'lodash';
import async from 'async';
import models from '../../api/models';
import sendError from '../../helpers/error.sender';
import status from '../../helpers/constants/status.codes';
import errorMessages from '../../helpers/constants/error.messages';

const { Tag } = models;

/**
 * A middleware  to validate the already existing tags of an article
 * Sends a result back if the client is trying to addd the same tags
 *
 * @author  Prémices
 * @static
 * @param {object} req the request
 * @param {object} res the response to be sent
 * @param { object } next the next route controller to be called
 * @returns {Object} res, next
 */

export default async (req, res, next) => {
  // Initializing variables
  let currentTag;
  let existingArticleTags = [];
  let tagsNames = '';

  // Checking if there are already existing tags
  if (!_.isEmpty(req.existingArticleTags)) {
    // Looping the tags array to get all tags details
    async.each(req.existingArticleTags,
      async (tag, callback) => {
        currentTag = await Tag.findOne({
          where: {
            id: tag.tagId
          }
        });

        // Storing the tags in an array
        if (currentTag) {
          existingArticleTags = [...existingArticleTags, currentTag.dataValues];
          tagsNames = `${tagsNames}, ${currentTag.dataValues.name}`;
        }
        callback();
      },
      (result, error) => {
        if (!error) {
          // Building the error key
          const TAG_NAMES_STRING_INITIAL_LENGTH = 2;
          tagsNames = tagsNames.substring(TAG_NAMES_STRING_INITIAL_LENGTH);

          // Sending the error back
          sendError(status.RESET_CONTENT, res, `tags ${tagsNames}`, errorMessages.existingTags);
        }
      });
  } else next();
};
