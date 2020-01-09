import { HelperMethods } from "../utils";
import { isWebUri } from 'valid-url';

/**
 * Trims input values from user
 * @param {object} objectWithValuesToTrim - request body to trim
 * @returns {object} trimmedValues - trimmed values of the request object
 */
const trimValues = objectWithValuesToTrim => {
  const trimmedValues = objectWithValuesToTrim;
  Object.keys(trimmedValues).forEach(key => {
    trimmedValues[key] = trimmedValues[key].length
      ? trimmedValues[key].trim()
      : trimmedValues[key];
  });
  return trimmedValues;
};

/**
 * Defines the failed message returned when required fields are missing.
 * @param {object} res - Response object
 * @param {string} message - specific error message
 * @returns {res} - Response object
 */
const allFieldsRequired = (res, message) => {
  return res.status(400).json({
    success: false,
    message: `Invalid request! '${message}' field is required`
  });
};

/**
 * Defines the failed message returned when required fields are missing.
 * @param {object} requestBody - HTTP request object
 * @returns {string} - Property of the request body object that is empty.
 */
const checkForEmptyFields = requestBody => {
  let result;
  Object.keys(requestBody).forEach(key => {
    if (!requestBody[key].length) result = key;
  });
  return result;
};

/**
 * class representing an handler's validation
 * @class Validate
 * @description Validation for user inputs in all requests
 */
class Validation {
  /**
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {callback} next - The callback that passes the request to the next handler
   * @returns {object} res - Response object when query is invalid
   * @memberof Validation
   */
  static validateUserInput(req, res, next) {
    req.body = trimValues(req.body);
    const emptyField = checkForEmptyFields(req.body);
    if (emptyField) return allFieldsRequired(res, emptyField);
    next();
  }

   /**
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {callback} next - The callback that passes the request to the next handler
   * @returns {object} res - Response object when query is invalid
   * @memberof Validation
   */
  static validateUserLogin(req, res, next) {
    req.body = trimValues(req.body);
    const { username, password } = req.body;
    if (!username) return allFieldsRequired(res, 'username');
    if (!password) return allFieldsRequired(res, 'password');
    next();
  }

    /**
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {callback} next - The callback that passes the request to the next handler
   * @returns {object} res - Response object when query is invalid
   * @memberof Validation
   */
  static validateJsonInput(req, res, next) {
      req.body = trimValues(req.body);
      if (req.body.constructor.name === 'Object') {
        return next();
      }
  }
    /**
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {callback} next - The callback that passes the request to the next handler
   * @returns {object} res - Response object when query is invalid
   * @memberof Validation
   */
  static validateThumbnailGenerator(req, res, next) {
    const { image } = req.body;
    if (!image) return allFieldsRequired(res, 'image');
    if (!isWebUri(image)) {
      return HelperMethods.clientError(res,'Invalid! Please input a public image URL')
    }
    return next();
  }
}

export {
  Validation, allFieldsRequired, trimValues, checkForEmptyFields
};
