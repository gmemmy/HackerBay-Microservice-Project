import { Validation } from '../validation';
import ThumbnailGeneratorController from '../controllers/ThumbnailGeneratorController';
import Authorization from '../middleware/authorization';

const imageThumbnailGenerator = app => {
  app.post(
    '/api/v1/thumbnail',
    Authorization.checkToken,
    Validation.validateThumbnailGenerator,
    ThumbnailGeneratorController.imageThumbnailGenerator
  );
};

export default imageThumbnailGenerator;
