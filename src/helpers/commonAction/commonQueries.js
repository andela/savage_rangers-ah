import Sequelize from 'sequelize';
import models from '../../api/models/index';

const {
  Reason,
  User,
  Article,
  Comment,
  ReportedComment
} = models;
export default {
  reportArticleJoin: [
    {
      model: Article,
      required: true,
      attributes: ['title', 'slug', 'description', 'body', 'coverImage']
    },
    {
      model: User,
      required: true,
      attributes: ['username', 'email']
    },
    {
      model: Reason,
      required: true,
      attributes: ['description']
    }
  ],
  reportCommentJoin: [
    {
      model: Comment,
      required: true,
      attributes: ['id', 'body', 'articleSlug']
    },
    {
      model: User,
      required: true,
      attributes: ['username', 'email']
    },
    {
      model: Reason,
      required: true,
      attributes: ['description']
    }
  ],
  commentJoin: [
    {
      model: Reason,
      required: true,
      attributes: ['id', 'description'],
      through: {
        model: ReportedComment,
        attributes: ['userId']
      }
    }
  ],
  publish: {
    title: {
      [Sequelize.Op.ne]: null
    },
    body: {
      [Sequelize.Op.ne]: null
    },
    description: {
      [Sequelize.Op.ne]: null
    },
    category: {
      [Sequelize.Op.ne]: null
    },
    coverImage: {
      [Sequelize.Op.ne]: null
    }
  },
  getSingleArticle: {
    status: {
      [Sequelize.Op.ne]: 'draft'
    }
  },
  getCommentJoin: [
    {
      model: User,
      required: true,
      attributes: ['username', 'bio', 'profileImage']
    },
    {
      model: Comment,
      as: 'Replies'
    }
  ]
};
