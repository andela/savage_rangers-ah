// eslint-disable-next-line import/no-cycle
import { io } from '../../index';
import env from '../../configs/environments';
import models from '../../api/models';
import sendNotification from './sender';

const { Article, User } = models;
/* istanbul ignore next */
export default async (operation, articleSlug) => {
  try {
    const url = `${env.baseUrl}/api/articles`;

    const message = {
      inAppMessage: '',
      emailMessage: '',
      emailButtonText: ''
    };

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

    message.inAppMessage = `The article ${article.title} has been ${operation}ed`;
    message.emailMessage = `The article ${
      article.title
    } has been ${operation}ed. Click the button bellow to follow up`;
    message.emailButtonText = 'Follow';

    const notification = await sendNotification('articles', 'report', article.User, message, url);
    io.emit(`${operation}Article`, notification);

    return notification;
  } catch (error) {
    return { errors: error };
  }
};
