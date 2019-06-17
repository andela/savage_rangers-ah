import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;
const env = process.env.NODE_ENV;
const jwtSecret = process.env.TOKEN_KEY;

const environnements = [
  {
    name: 'test',
    port,
    dbUrl: process.env.TEST_DB_URL,
    secret: jwtSecret
  },
  {
    name: 'development',
    port,
    dbUrl: process.env.DEV_DB_URL,
    secret: jwtSecret
  },
  {
    name: 'production',
    port,
    dbUrl: process.env.DB_URL,
    secret: jwtSecret
  },
  {
    name: 'stagging',
    port,
    dbUrl: process.env.DB_URL,
    secret: jwtSecret
  }
];

const currentEnv = environnements.find(el => el.name === env.toLocaleLowerCase());
export default { currentEnv, env };
