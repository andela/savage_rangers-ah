import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from 'morgan';
import apiRouter from './api/routes/index';
import docsRouter from './api/routes/docs';
import homeRouter from './api/routes/home';

dotenv.config();
const app = express();

app.use(cors())
	.use(express.json())
	.use(express.urlencoded({
		extended: false
	}))
	.use(logger('dev'))
	.use(express.static(`${__dirname}/public`));

app.use('/api', apiRouter);
app.use('/docs', docsRouter);
app.use('/', homeRouter);

export default app;
