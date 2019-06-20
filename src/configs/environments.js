import 'dotenv/config';


const port = process.env.PORT;
const env = process.env.NODE_ENV;
const jwtSecret = process.env.TOKEN_KEY;
const mailerEmail = process.env.MAILER_EMAIL;
const mailerToken = process.env.MAILER_API_KEY;
const baseUrl = process.env.API_BASE_URL;
const hashRounds = process.env.BCRYPT_HASH_ROUNDS;

const environments = [
  {
    name: 'test',
    port,
    dbUrl: process.env.TEST_DB_URL,
    secret: jwtSecret,
    mailerEmail,
    mailerToken,
    baseUrl,
    hashRounds
  },
  {
    name: 'development',
    port,
    dbUrl: process.env.DEV_DB_URL,
    secret: jwtSecret,
    mailerEmail,
    mailerToken,
    baseUrl,
    hashRounds
  },
  {
    name: 'production',
    port,
    dbUrl: process.env.DB_URL,
    secret: jwtSecret,
    mailerEmail,
    mailerToken,
    baseUrl,
    hashRounds
  },
  {
    name: 'stagging',
    port,
    dbUrl: process.env.DB_URL,
    secret: jwtSecret,
    mailerEmail,
    mailerToken,
    baseUrl,
    hashRounds
  }
];

const currentEnv = environments.find(el => el.name === env.toLocaleLowerCase());
export default { currentEnv, env };
