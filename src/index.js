import express from 'express';
import apiRouter from './api/routes/index';
import environement from './configs/environnements';
import docsRouter from './api/routes/docs';
import homeRouter from './api/routes/home';
import register from './middlewares/register.app';


const app = express();
const env = environement();

// Register middleware
register(app);

app.use('/api/', apiRouter);
app.use('/docs', docsRouter);

app.use('/', homeRouter);

app.listen(env.port, () => {
  console.log(`Server now listening on port ${env.port} in ${env.name} mode!`);
});

export default app;
