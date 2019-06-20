import express from 'express';
import apiRouter from './api/routes/index';
import docsRouter from './api/routes/docs';
import homeRouter from './api/routes/home';
import register from './middlewares/register.app';
import { sequelize } from './api/models/index';
import environments from './configs/environments';


const app = express();
const env = environments.currentEnv;

// Register middleware
register(app);

app.use('/api', apiRouter);
app.use('/docs', docsRouter);

app.use('/', homeRouter);

sequelize.sync().then(() => {
  app.listen(env.port);
});

export default app;
