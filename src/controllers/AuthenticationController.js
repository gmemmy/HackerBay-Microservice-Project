import { Authentication, HelperMethods } from '../utils';

/**
 * Class representing the authentication controller
 * @class AuthenticationController
 * @description users controller
 */
class AuthenticationController {
  /**
   * Login a user
   * Route: POST: /auth/login
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof UserController
   */
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = { username, password };
      const createdToken = await Authentication.getToken(user);
      if (createdToken) {
        delete user.password;
        return HelperMethods.requestSuccessful(res, {
          success: true,
          message: 'Login successful!',
          user
        }, 200)
      }
      return HelperMethods.serverError(res);
    } catch (error) {
      return HelperMethods.serverError(res);
    }
  }
}

export default AuthenticationController;
