import express from 'express';
import dbTestController from '../controllers/db.test';

const dbTest = express();

const { create, get, remove } = dbTestController;

dbTest.post('/create', create);
dbTest.get('/get', get);
dbTest.delete('/delete/:id', remove);

export default dbTest;
