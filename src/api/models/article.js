import slug from 'slug';

const readTime = article => Math.ceil(article.body.split(' ').length / 265);

export default (sequelize, DataTypes) => {
	const Article = sequelize.define('Article',
		{
			id: {
				allowNull: false,
				unique: true,
				primaryKey: true,
				type:
          DataTypes.UUID,
				defaultValue:
          DataTypes.UUIDV4
			},
			title: {
				type:
          DataTypes.STRING,
				allowNull: false
			},
			description: {
				type:
          DataTypes.STRING,
				allowNull: true
			},
			body: {
				type:
          DataTypes.STRING
			},
			readTime: {
				type:
          DataTypes.INTEGER
			},
			slug: {
				type:
          DataTypes.STRING,
				allowNull: false
			}
		},
		{
			tableName:
        'articles',
			paranoid: true,
			hooks: {
				beforeCreate(article) {
					article.slug = slug(`${
						article.title
					}-${(
						Math.random() * (42 ** 4)
              || 0
					).toString(42)}`).toLowerCase();
					article.readTime = readTime(article);
				},
				beforeUpdate(article) {
					article.readTime = readTime(article);
				}
			}
		});
	Article.associate = ({
		User
	}) => {
		Article.belongsTo(User,
			{
				foreignKey:
          'userId',
				as:
          'author',
				onDelete:
          'CASCADE',
				hooks: true
			});
	};
	return Article;
};
