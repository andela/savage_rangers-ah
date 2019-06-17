const dotenv = require('dotenv');

dotenv.config();
const {
	DB_NAME, DB_HOST, DB_PORT, TEST_DB_NAME
} = process.env;

module.exports = {
	development: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: DB_NAME,
		host: DB_HOST,
		port: DB_PORT,
		dialect: 'postgres',
		// url: DEV_DB_URL,
		logging: true
	},
	test: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: TEST_DB_NAME,
		host: DB_HOST,
		port: DB_PORT,
		// url: TEST_DB_URL,
		dialect: 'postgres',
		logging: false
	},
	production: {
		use_env_variable: 'DATABASE_URL'
	}
};
