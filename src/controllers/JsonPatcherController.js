import { HelperMethods } from '../utils';
import jsonpatch from 'jsonpatch';

/**
 * Class representing the Json Patcher controller
 * @class JsonPatcherController
 * @description Json Patcher controller
 */
class JsonPatcherController {
    /**
   * Patch a json Object
   * Route: POST: /patch
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof JsonPatcherController
   */
  static async jsonpatch(req, res) {
    try {
      const firstKey = Object.keys(req.body)[0];
      const thePatch = [
        { "op": "replace", "path": `/${firstKey}`, "value": "I've been all patched up!" }
      ]
      const patchedDoc = await jsonpatch.apply_patch(req.body, thePatch);
      if (patchedDoc) {
        return HelperMethods.requestSuccessful(res, {
          success: true,
          message: 'JSON object patched successfully',
          patchedDoc
        }, 200)
      }
      return HelperMethods.serverError(res);
    } catch (error) {
        return HelperMethods.serverError(res);
    }
  }
}

export default JsonPatcherController;
