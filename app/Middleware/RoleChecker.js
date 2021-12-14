"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @type {typeof import('../Exceptions/NotAuthorizedException')} */
const NotAuthorizedException = use("App/Exceptions/NotAuthorizedException");
/** @type {typeof import('../Exceptions/UnexpectedErrorException')} */
const UnexpectedErrorException = use("App/Exceptions/UnexpectedErrorException");
/** @type {typeof import('../Utils/index')} */
const { getAuthJwtPayload } = use("App/Utils/index");
/** @type {typeof import('../Helper/Entities/role')} */
const Role = use("App/Helper/Entities/role");
const exceptionResponseFactory = use("App/Exceptions/exceptionResponseFactory");

class RoleChecker {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response, auth }, next, properties) {
    try {
      const authJwtPayload = getAuthJwtPayload(auth);
      const roleId = authJwtPayload.role_id;

      if (!authJwtPayload || !roleId) {
        throw new NotAuthorizedException("User role wasn't received.");
      }

      const role = await Role.findById(roleId);

      if (Array.isArray(properties) && properties.length > 0) {
        const roleWasFound = properties.some(
          (roleCode) => roleCode === role.code
        );

        if (!roleWasFound) {
          throw new NotAuthorizedException(
            "User role doesn't have permission for this request."
          );
        }
      }

      await next();
    } catch (error) {
      return response.status(400).json(exceptionResponseFactory(error));
    }
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async wsHandle({ request }, next) {
    // call next to advance the request
    await next();
  }
}

module.exports = RoleChecker;
