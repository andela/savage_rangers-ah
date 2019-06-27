import express from 'express';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import logger from 'morgan';
import apiRouter from './api/routes/index';
import docsRouter from './api/routes/docs';
import homeRouter from './api/routes/home';
import env from './configs/environments';

import passportConfig from './middlewares/passport';
import './helpers/cloudnary';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use(express.static(`${__dirname}/public`));
app.use(passport.initialize());
passportConfig(passport);

app.use(session({
  secret: env.secret,
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false
}));

app.use('/api', apiRouter);
app.use('/docs', docsRouter);
app.use('/', homeRouter);

app.listen(env.appPort);

export default app;
