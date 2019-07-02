
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

  const userAttributes = ['username', 'profileImage', 'email'];
  const articleAttributes = ['title', 'description', 'slug', 'body'];

  const articles = Article.findAll({
    where: {
      [Sequelize.Op.or]: [
        title ? { title: { [Sequelize.Op.substring]: title.trim() } } : '',
        body ? { body: { [Sequelize.Op.substring]: body.trim() } } : '',
        tag ? { '$Tags.name$': { [Sequelize.Op.substring]: tag.trim() } } : '',
        username ? { '$User.username$': { [Sequelize.Op.substring]: username.trim() } } : ''
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
    attributes: articleAttributes
  });
  return articles;
};
