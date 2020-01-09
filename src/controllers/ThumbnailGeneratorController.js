import { HelperMethods } from '../utils';
import imageThumbnail from 'image-thumbnail';
import download from '../utils/imageDownloadModule';

let options = { height: 150, width: 150 }

/**
 * Class representing the Thumbnail Generator controller
 * @class ThumbnailGeneratorController
 * @description Thumbnail Generator controller
 */
class ThumbnailGeneratorController {
  /**
   * generate a 50x50 thumbnail from an image
   * Route: POST: /patch
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof JsonPatcherController
   */
  static async imageThumbnailGenerator(req, res) {
    try {
      const { image } = req.body;
       await download(`${image}`, 'image.jpeg', async () => {
          const thumbnail = await imageThumbnail('./image.jpeg', options);
          if (thumbnail) {
            return HelperMethods.requestSuccessful(res, {
              success: true,
              message: 'Thumbnail image generated successfully!',
              thumbnail
            }, 200)
          }
          HelperMethods.serverError(res)
      })
    } catch (err) {
      HelperMethods.serverError(res);
    }
  }
}

export default ThumbnailGeneratorController;
