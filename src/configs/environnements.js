import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

export default () => {
  const env = process.env.NODE_ENV;

  switch (env) {
    case 'test': {
      return {
        name: 'test',
        port,
        dbUrl: process.env.TEST_DB_URL
      };
    }

    case 'dev': {
      return {
        name: 'development',
        port,
        dbUrl: process.env.DEV_DB_URL
      };
    }
    case 'production': {
      return {
        name: 'production',
        port,
        dbUrl: process.env.DB_URL
      };
    }
    case 'stage': {
      return {
        name: 'stagging',
        port,
        dbUrl: process.env.DB_URL
      };
    }
    default: {
      return {
        name: 'default',
        port,
        dbUrl: process.env.DEV_DB_URL
      };
    }
  }
};
