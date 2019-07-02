// eslint-disable-next-line import/no-cycle
import { io } from '../../index';
import env from '../../configs/environments';
import models from '../../api/models';
import sendNotification from './sender';

const { Article, User } = models;
/* istanbul ignore next */
export default async (articleSlug) => {
  try {
    const url = `${env.baseUrl}/api/articles/${articleSlug}`;

    const message = {
      inAppMessage: '',
      emailMessage: '',
      emailButtonText: ''
    };

    let notification = {};

    const article = await Article.findOne({
      attributes: ['title'],
      include: {
        model: User,
        required: true,
        attributes: ['id', 'email', 'username']
      },
      where: {
        slug: articleSlug
      }
    });

    const moderators = await User.findAll({
      attributes: ['id', 'email', 'username'],
      where: { role: 'moderator' }
    });

    message.inAppMessage = `The article ${article.title} has been reported`;
    message.emailMessage = `The article ${
      article.title
    } has been reported. Click the button bellow to follow up`;
    message.emailButtonText = 'Follow';

    notification = await sendNotification('articles', 'report', article.User, message, url);
    io.emit('reportArticle', notification);

    return moderators.map(async (moderator) => {
      notification = await sendNotification('articles', 'report', moderator, message, url);
      io.emit('reportArticle', notification);
    });
  } catch (error) {
    return { errors: error };
  }
};
