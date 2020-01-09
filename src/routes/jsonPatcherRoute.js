import Validation from '../validation';
import JsonPatcherController from '../controllers/JsonPatcherController';
import Authorization from '../middleware/authorization';

const jsonPatcherRoute = app => {
  app.post(
    '/api/v1/patch',
    Authorization.checkToken,
    Validation.validateJsonInput,
    JsonPatcherController.jsonpatch
  );
};

export default jsonPatcherRoute;
