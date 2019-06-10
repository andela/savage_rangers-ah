import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV;
const jwtSecret = process.env.TOKEN_KEY;
<<<<<<< HEAD:src/configs/environnements.js
const mailerEmail = process.env.MAILER_EMAIL;
const mailerToken = process.env.MAILER_API_KEY;
const baseUrl = process.env.API_BASE_URL;
=======
>>>>>>> [Ft #166240818] send a valid token to the user:src/configs/environments.js

const environnements = [
  {
    name: 'test',
    port,
    dbUrl: process.env.TEST_DB_URL,
    secret: jwtSecret,
<<<<<<< HEAD:src/configs/environnements.js
    mailerEmail,
    baseUrl,
=======
>>>>>>> [Ft #166240818] send a valid token to the user:src/configs/environments.js
  },
  {
    name: 'development',
    port,
    dbUrl: process.env.DEV_DB_URL,
    secret: jwtSecret,
<<<<<<< HEAD:src/configs/environnements.js
    mailerEmail,
    mailerToken,
    baseUrl,
=======
>>>>>>> [Ft #166240818] send a valid token to the user:src/configs/environments.js
  },
  {
    name: 'production',
    port,
    dbUrl: process.env.DB_URL,
    secret: jwtSecret,
<<<<<<< HEAD:src/configs/environnements.js
    mailerEmail,
    mailerToken,
    baseUrl,
=======
>>>>>>> [Ft #166240818] send a valid token to the user:src/configs/environments.js
  },
  {
    name: 'stagging',
    port,
    dbUrl: process.env.DB_URL,
    secret: jwtSecret,
<<<<<<< HEAD:src/configs/environnements.js
    mailerEmail,
    mailerToken,
    baseUrl,
=======
>>>>>>> [Ft #166240818] send a valid token to the user:src/configs/environments.js
  }
];


const currentEnv = environnements.find(el => el.name === env.toLocaleLowerCase());
export default { currentEnv, env };
