import errorSender from '../error.sender';
import errorMessage from '../constants/error.messages';

export default (length, res, status, result) => {
  const emptyArticleArray = 0;
  if (length > emptyArticleArray) {
    res.status(status.OK).json({
      result
    });
  } else {
    errorSender(status.NOT_FOUND, res, 'Articles', errorMessage.noMoreArticle);
  }
};
