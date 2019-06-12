import express from 'express';
import '@babel/polyfill';
import apiRouter from './api/routes/index';
import docsRouter from './api/routes/docs';
import homeRouter from './api/routes/home';
import register from './middlewares/register.app';
import { sequelize } from './api/models/index';
import environnements from './configs/environnements';
import verifyEmail from './api/routes/verifyEmail';


const app = express();
const env = environnements.currentEnv;

const syncDbOnStart = env.name === 'test';

// Register middleware
register(app);

app.use('/api/', apiRouter);
app.use('/docs', docsRouter);
app.use('/verifyEmail', verifyEmail);

app.use('/', homeRouter);

sequelize.sync().then(() => {
  app.listen(env.port, () => {
    console.log(`Server now listening on port ${env.port} in ${env.name} mode!`);
  });
});

export default app;
