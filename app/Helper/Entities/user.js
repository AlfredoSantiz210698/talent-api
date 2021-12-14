"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use("App/Models/User");
const UserRole = use("App/Models/UserRole");

/**
 * Get user for auth.
 *
 * @param {*} email
 * @param {*} roleId
 * @return {Promise}
 */
const getUserForAuth = async (email, roleId) => {
  const user = await User.query()
    .withEmail(email)
    .whereHasRole(roleId)
    .with("roles", (builder) => {
      builder.where("roles.id", roleId);
    })
    .with("rolesPivot", (builder) => {
      builder.where("user_roles.role_id", roleId);
    })
    .first();

  return user ? user.toJSON() : user;
};

/**
 * Gets all roles from user email.
 *
 * @param {string} email
 * @return {Promise}
 */
const getRolesByEmail = async (email) => {
  return (await UserRole.query().withEmail(email).fetch()).toJSON();
};

/**
 * Create a new user.
 *
 * @param {*} payload
 * @return {Promise}
 */
const create = async (payload) => {
  return await User.create(payload);
};

const first = async (filters) => {
  // const userQuery = User.query();
  // const { query = [], withs = [] } = filters;
  // for (const [key, value] of Object.entries(whereConditions)) {
  //   userQuery.where(key, value);
  // }
  // return await userQuery.first();
  // return await User.query()
  //   .withEmail(email)
  //   .whereHasRole(roleId)
  //   .with("roles", (builder) => {
  //     builder.where("roles.id", roleId);
  //   })
  //   .first();
  // const userQuery = User.query();
  // for (const [key, value] of Object.entries(whereConditions)) {
  //   userQuery.where(key, value);
  // }
  // return await userQuery.first();
};

module.exports = {
  first,
  create,
  getUserForAuth,
  getRolesByEmail,
};
