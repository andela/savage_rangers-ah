import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

const app = express();

dotenv.config();
// register middlewares

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

// routes (to be replaced)
app.use('*', ( req, res, next ) => {
  return res.status(200).json({
    message : 'Welcome',
    purpose : 'heroku test',
    wish : 'See you soon',
  });
});

app.listen( port, () =>{});
