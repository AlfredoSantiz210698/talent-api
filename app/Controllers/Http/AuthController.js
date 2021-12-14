"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('../../Exceptions/NotProcessedException')} */
const NotProcessedException = use("App/Exceptions/NotProcessedException");
/** @type {typeof import('../../Exceptions/NotAuthorizedException')} */
const NotAuthorizedException = use("App/Exceptions/NotAuthorizedException");
/** @type {typeof import('../../Helper/Entities/user')} */
const User = use("App/Helper/Entities/user");
/** @type {typeof import('../../Utils/index')} */
const { isEmptyArray } = use("App/Utils");
const exceptionResponseFactory = use("App/Exceptions/exceptionResponseFactory");

class AuthController {
  /**
   * SignIn an user.
   * POST auths
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async signIn({ request, response, auth }) {
    try {
      const { email, password } = request.only(["email", "password"]);
      let role_id = request.input("role_id", null);

      if (!role_id) {
        const roles = await User.getRolesByEmail(email);

        if (isEmptyArray(roles)) {
          throw new NotAuthorizedException("User doesn't have a role");
        }

        if (roles.length > 1) {
          throw new NotProcessedException("You must choose a role to signin");
        }

        role_id = roles[0].role_id;
      }

      const user = await User.getUserForAuth(email, role_id);
      if (!user) {
        throw new NotAuthorizedException(
          "User not found with the received data"
        );
      }

      const jwt = await auth.attempt(email, password, {
        role_id,
        user_role_id: user.rolesPivot[0].id,
      });

      return response.status(200).json({ user, jwt });
    } catch (error) {
      return response.status(400).json(exceptionResponseFactory(error));
    }
  }

  // /**
  //  * SignUp new user.
  //  * POST auths
  //  *
  //  * @param {object} ctx
  //  * @param {Request} ctx.request
  //  * @param {Response} ctx.response
  //  */
  // async signUp({ auth, request, response }) {
  //   try {
  //     const payload = request.only([
  //       "name",
  //       "first_name",
  //       "last_name",
  //       "username",
  //       "email",
  //       "password",
  //     ]);

  //     const [role, roleError] = await promiseResolver(Role.getDirector());
  //     if (roleError) {
  //       throw new UnexpectedErrorException();
  //     }
  //     const roleId = role.id;
  //     payload.role_id = roleId;

  //     const [user, userError] = await promiseResolver(User.create(payload));
  //     if (userError) {
  //       throw new RecordNotCreatedException("User couldn't be created");
  //     }

  //     const jwt = await auth.generate(user, { roleId });

  //     return response.status(201).json({ user, jwt });
  //   } catch (error) {
  //     return response.status(400).json(exceptionResponseFactory(error));
  //   }
  // }

  /**
   * SignOut an user.
   * POST auths
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async signOut({ auth, request, response }) {}
}

module.exports = AuthController;
