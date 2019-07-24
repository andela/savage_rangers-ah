import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import apiRouter from './api/routes/index';
import docsRouter from './api/routes/docs';
import homeRouter from './api/routes/home';
import register from './middlewares/register.app';
import env from './configs/environments';
// eslint-disable-next-line import/no-cycle
import initializeEvents from './helpers/event.listeners';

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Register middleware
register(app, io);
app.server = server;

app.use('/api', apiRouter);
app.use('/docs', docsRouter);

app.use('/', homeRouter);

app.server.listen(env.appPort, () => initializeEvents());

export { io };

export default app;
