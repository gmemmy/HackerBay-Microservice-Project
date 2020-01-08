/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

if (app.get('env') !== 'test') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(cors());

app.listen(port, () => {
  console.info(`Server is up and listening on port ${port}`);
});

export default app;
