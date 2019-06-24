import express from 'express';
import apiRouter from './api/routes/index';
import docsRouter from './api/routes/docs';
import homeRouter from './api/routes/home';
import register from './middlewares/register.app';
import env from './configs/environments';

const app = express();

// Register middleware
register(app);

app.use('/api', apiRouter);
app.use('/docs', docsRouter);

app.use('/', homeRouter);

app.listen(env.appPort);

export default app;
