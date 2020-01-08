import AuthenticationController from '../controllers/AuthenticationController';

const authRoute = (app) => {
  app.post(
    '/api/v1/auth/login',
    AuthenticationController.login,
  );
};

export default authRoute;
