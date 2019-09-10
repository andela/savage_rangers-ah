
export default (Sequelize, req, models) => {
  const {
    title, body, tag, username
  } = req.query;

  const {
    Article,
    ArticleTag,
    Tag,
    Category,
    User
  } = models;

  const { limit, offset } = req.query;

  const userAttributes = ['username', 'profileImage', 'email'];

  const articles = Article.findAndCountAll({
    where: {
      [Sequelize.Op.or]: [
        title ? { title: { [Sequelize.Op.iLike]: `%${title.trim()}%` } } : '',
        body ? { body: { [Sequelize.Op.iLike]: `%${body.trim()}%` } } : '',
        tag ? { '$Tags.name$': { [Sequelize.Op.iLike]: `%${tag.trim()}%` } } : '',
        username ? { '$User.username$': { [Sequelize.Op.iLike]: `%${username.trim()}%` } } : ''
      ]
    },
    include: [
      {
        model: Tag,
        attributes: ['name'],
        required: false,
        through: {
          model: ArticleTag,
          attributes: []
        }
      },
      {
        model: User,
        attributes: userAttributes
      },
      {
        model: Category,
        as: 'Category',
        attributes: ['name']
      }
    ],
    distinct: true,
    offset,
    limit,
  });

  return articles;
};
