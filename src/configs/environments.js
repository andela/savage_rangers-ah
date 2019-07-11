import dotenv from 'dotenv';

dotenv.config();
const appPort = process.env.PORT;
const env = process.env.NODE_ENV;
const jwtSecret = process.env.TOKEN_KEY;
const mailerEmail = process.env.MAILER_EMAIL;
const mailerToken = process.env.MAILER_API_KEY;
const baseUrl = process.env.API_BASE_URL;
const hashRounds = process.env.BCRYPT_HASH_ROUNDS;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const devDatabase = process.env.DEV_DATABASE;
const testDatabase = process.env.TEST_DATABASE;
const host = process.env.HOST;
const dialect = 'postgres';
const port = process.env.DB_PORT;
const { APP_URL_FRONTEND } = process.env;

const environments = [
  {
    name: 'test',
    appPort,
    dbUrl: process.env.TEST_DB_URL,
    secret: jwtSecret,
    mailerEmail,
    mailerToken,
    baseUrl,
    hashRounds,
    username,
    password,
    database: testDatabase,
    host,
    dialect,
    port,
    APP_URL_FRONTEND
  },
  {
    name: 'development',
    appPort,
    dbUrl: process.env.DEV_DB_URL,
    secret: jwtSecret,
    mailerEmail,
    mailerToken,
    baseUrl,
    hashRounds,
    username,
    password,
    database: devDatabase,
    host,
    dialect,
    port,
    APP_URL_FRONTEND
  },
  {
    name: 'production',
    appPort,
    dbUrl: process.env.DB_URL,
    secret: jwtSecret,
    mailerEmail,
    mailerToken,
    baseUrl,
    hashRounds,
    username,
    password,
    host,
    dialect,
    port,
    APP_URL_FRONTEND
  },
  {
    name: 'stagging',
    appPort,
    dbUrl: process.env.DB_URL,
    secret: jwtSecret,
    mailerEmail,
    mailerToken,

    baseUrl,
    hashRounds,
    username,
    password,
    database: devDatabase,
    host,
    dialect,
    port,
    APP_URL_FRONTEND
  }
];

const currentEnv = environments.find(el => el.name === env.toLocaleLowerCase());
module.exports = currentEnv;
