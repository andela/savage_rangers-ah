import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV;

const environnements = [
  {
    name: 'test',
    port,
    dbUrl: process.env.TEST_DB_URL
  },
  {
    name: 'development',
    port,
    dbUrl: process.env.DEV_DB_URL
  },
  {
    name: 'production',
    port,
    dbUrl: process.env.DB_URL
  },
  {
    name: 'stagging',
    port,
    dbUrl: process.env.DB_URL
  }
];


const currentEnv = environnements.find(el => el.name === env.toLocaleLowerCase());
export default { currentEnv, env };
