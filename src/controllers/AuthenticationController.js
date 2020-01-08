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
      delete user.password;
      return res.status(200).json({
        status: 200,
        success: true,
        message: 'Login successful!',
        user,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        success: false,
        message: 'An error occurred, please try again',
      });
    }
  }
}

export default AuthenticationController;
