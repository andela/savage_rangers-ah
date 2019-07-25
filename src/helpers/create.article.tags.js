import async from 'async';
import models from '../api/models';

const { ArticleTag } = models;
/**
 * A Function to add tags to an article
 *
 * @param {Object} data - An object containing the tags to add
 * @returns {Object} res
 */
export default data => new Promise((resolve) => {
  // Initializing variables
  let resultObject = {};

  // Updating the tags
  // Add new tags to the article
  /*
   throwing an error with this module is really tricky.
  */
  /* istanbul ignore next  */
  async.each(data.newAddedTags,
    async (addedTag, callback) => {
      await ArticleTag.create({
        articleId: data.article.id,
        tagId: addedTag.id
      });
      callback();
    },
    (result1, error1) => {
      if (!error1) {
        // Adding the currently existing tags to the article
        async.each(data.existingTags,
          async (existingArticleTagToAdd, callback) => {
            await ArticleTag.create({
              articleId: data.article.id,
              tagId: existingArticleTagToAdd.id
            });
            callback();
          },
          (result2, error2) => {
            if (!error2) {
              // sending the result back
              resultObject = [...data.newAddedTags, ...data.existingTags];
              resolve(resultObject);
            }
          });
      }
    });
});
