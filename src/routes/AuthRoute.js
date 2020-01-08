import AuthenticationController from '../controllers/AuthenticationController';
import Validation from '../validation';

const authRoute = app => {
  app.post(
    '/api/v1/auth/login',
    Validation.validateUserLogin,
    AuthenticationController.login,
  );
};

export default authRoute;
