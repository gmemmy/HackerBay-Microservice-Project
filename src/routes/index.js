import authRoute from './authRoute';
import jsonPatcherRoute from './jsonPatcherRoute';
import imageThumbnailGenerator from './imageThumbnailGeneratorRoute';

/**
 * Handles request
 * @param {object} app - An instance of the express module
 * @returns {object} - An object containing all routes
 */
const routes = app => {
  app.get('/api/v1/', (req, res) => {
    res.status(200).send({
      success: true,
      message: 'Welcome to the Microservice Project'
    });
  });
  authRoute(app);
  jsonPatcherRoute(app);
  imageThumbnailGenerator(app);
};

export default routes;
