/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/AuthRoute';

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

routes(app);

app.all('*', (req, res) => res.status(404).json({
  success: false,
  message: 'The page you are looking for does not exist',
}));

export default app;
