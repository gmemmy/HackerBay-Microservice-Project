import Authentication from '../utils/authentication';

/**
 * Class representing the Authentication methods
 * @class Authorization
 * @description Authenticate protected routes
 */
class Authorization {
  /**
   *
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {callback} next - The callback that passes the request
   * to the next handler
   * @returns {callback} next - The callback that passes the request
   * to the next handler
   * @returns {object} res - Response object containing an error due
   * to invalid token or no token in the request
   */
  static async checkToken(req, res, next) {
    const token = req.headers['x-access-token'] || req.query.token || req.body.token;
    if (!token) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: 'User not authorized',
      });
    }
    const verifiedToken = await Authentication.verifyToken(token);
    if (!verifiedToken.success) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: 'User not authorized',
      });
    }
    req.decoded = verifiedToken;
    return next();
  }
}

export default Authorization;
