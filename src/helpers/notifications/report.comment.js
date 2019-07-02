// eslint-disable-next-line import/no-cycle
import { io } from '../../index';
import env from '../../configs/environments';
import models from '../../api/models';
import sendNotification from './sender';

const { Article, User, Comment } = models;
/* istanbul ignore next */
export default async (commentId) => {
  try {
    const substringInitialIndex = 0;
    const substringFinalIndex = 20;
    let notification = {};

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

    const url = `${env.baseUrl}/api/articles/${
      comment.dataValues.Article.dataValues.slug
    }/comments/${commentId}`;

    const message = {
      inAppMessage: '',
      emailMessage: '',
      emailButtonText: ''
    };

    const moderators = await User.findAll({
      attributes: ['id', 'email', 'username'],
      where: { role: 'moderator' }
    });

    message.inAppMessage = `The comment '${comment.dataValues.body.substring(substringInitialIndex,
      substringFinalIndex)}...' has been reported`;
    message.emailMessage = `The comment '${comment.dataValues.body.substring(substringInitialIndex,
      substringFinalIndex)}...' has been reported. Click the button bellow to follow up`;
    message.emailButtonText = 'Follow';

    notification = await sendNotification('comments',
      'report',
      comment.dataValues.User,
      message,
      url);

    io.emit('reportComment', notification);

    return moderators.map(async (moderator) => {
      notification = await sendNotification('articles', 'report', moderator, message, url);
      io.emit('reportComment', notification);
    });
  } catch (error) {
    return { errors: error };
  }
};
