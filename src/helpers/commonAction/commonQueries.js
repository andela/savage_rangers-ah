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
  ]
};
