/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';
import swaggerUI from 'swagger-ui-express';
import doc from '../doc.json';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.listen(port, () => {
  console.info(`Server is up and listening on port ${port}`);
});

// render swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(doc));
routes(app);

app.all('*', (req, res) => res.status(404).json({
  status: 404,
  success: false,
  message: 'The page you are looking for does not exist',
}));

export default app;
