// eslint-disable-next-line import/no-cycle
import { io } from '../../index';
import env from '../../configs/environments';
import models from '../../api/models';
import sendNotification from './sender';

const { Article, User, Comment } = models;
/* istanbul ignore next */
export default async (operation, commentId) => {
  try {
    const substringInitialIndex = 0;
    const substringFinalIndex = 20;
    const comment = await Comment.findOne({
      attributes: ['body'],
      include: [
        {
          model: Article,
          attributes: ['slug'],
          required: true
        },
        {
          model: User,
          required: true,
          attributes: ['id', 'email', 'username']
        }
      ],
      where: {
        id: commentId
      }
    });

    const url = `${env.baseUrl}/api/articles/${comment.dataValues.Article.dataValues.slug}`;

    const message = {
      inAppMessage: '',
      emailMessage: '',
      emailButtonText: ''
    };

    message.inAppMessage = `The comment '${comment.dataValues.body.substring(substringInitialIndex,
      substringFinalIndex)}...' has been ${operation}ed`;
    message.emailMessage = `The comment '${comment.dataValues.body.substring(substringInitialIndex,
      substringFinalIndex)}...' has been ${operation}ed. Click the button bellow to follow up`;
    message.emailButtonText = 'Follow';

    const notification = await sendNotification('comments',
      'report',
      comment.dataValues.User,
      message,
      url);

    io.emit(`${operation}Comment`, notification);
  } catch (error) {
    return { errors: error };
  }
};
