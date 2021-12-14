"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Talent = use("App/Models/Talent");
/** @type {typeof import('./talentFile')} */
const TalentFile = use("App/Helper/Entities/talentFile");
const UserRole = use("App/Models/UserRole");
const Database = use("Database");
/** @type {typeof import('../../Utils')} */
const { isObject, getPaginationPayload } = use("App/Utils");

/**
 * Gets all users child from user object.
 *
 * @param {*} userRole
 * @return {array}
 */
const getChildUsersRoleIds = (userRole) => {
  const ids = [];
  const { usersRolesChild = [] } = isObject(userRole) ? userRole : {};

  if (Array.isArray(usersRolesChild)) {
    usersRolesChild.forEach((childUserRole) => {
      ids.push(...getChildUsersRoleIds(childUserRole));
    });
  }

  ids.push(userRole.id);

  return ids;
};

/**
 * Gets userRole ids.
 *
 * @param {int} userRole
 * @return {array}
 */
const getUsersRoleIds = async (userRoleId) => {
  const user = await UserRole.query()
    .where("id", userRoleId)
    .with("usersRolesChild")
    .first();

  return user ? getChildUsersRoleIds(user.toJSON()) : [];
};

/**
 * Fetch all talents
 *
 * @param {int} userRoleId
 * @param {object} filters
 * @return {Promise}
 */
const all = async (userRoleId, filters) => {
  const {
    pagination = {},
    query = {},
    scopesPrivate = {},
    withs = {},
  } = isObject(filters) ? filters : {};
  
  const { page, perPage } = getPaginationPayload(pagination);
  const userRoleIds = await getUsersRoleIds(userRoleId);
  const talentQuery = Talent.toFilterQuery({
    builder: Talent.query().whereIn("user_role_id", userRoleIds),
    query,
    scopesPrivate,
    withs,
  });

  return await talentQuery.paginate(page, perPage);
};

/**
 * Find some talent by id.
 *
 * @param {int} id
 * @param {object} filters
 */
const find = async (id, filters) => {
  const {
    query = {},
    scopesPrivate = {},
    withs = {},
  } = isObject(filters) ? filters : {};

  const talentQuery = Talent.toFilterQuery({
    builder: Talent.query().findById(id),
    query,
    scopesPrivate,
    withs,
  });

  return await talentQuery.first();
};

/**
 * Find some talent by user.
 *
 * @param {int} id
 * @param {int} userRoleId
 * @param {object} filters
 * @return {Promise}
 */
const findByUser = async (id, userRoleId, filters) => {
  const {
    query = {},
    scopesPrivate = {},
    withs = {},
  } = isObject(filters) ? filters : {};

  const userRoleIds = await getUsersRoleIds(userRoleId);
  const talentQuery = Talent.toFilterQuery({
    builder: Talent.query().findById(id).whereIn("user_role_id", userRoleIds),
    query,
    scopesPrivate,
    withs,
  });

  return await talentQuery.first();
};

/**
 * Create a new talent.
 *
 * @param {object} payload
 * @return {Promise}
 */
const create = async (payload) => {
  return await Talent.create(payload);
};

/**
 * Update a talent.
 *
 * @param {int} id
 * @param {object} payload
 * @return {Promise}
 */
const update = async (id, payload) => {
  const talent = await Talent.find(id);

  if (!talent) return false;

  talent.merge(payload);
  await talent.save();

  return talent;
};

/**
 * Create a new talent.
 *
 * @param {int} id
 * @return {Promise}
 */
const destroy = async (id) => {
  const trx = await Database.beginTransaction();

  try {
    const talent = await Talent.find(id);
    if (!talent) {
      await trx.commit();
      return false;
    }

    await talent.load("files");
    for (const file of talent.getRelated("files").rows) {
      await TalentFile.destroyByModel(file, trx);
    }

    await talent.delete(trx);
    await trx.commit();
  } catch (error) {
    await trx.rollback();
    throw error;
  }

  return true;
};

module.exports = {
  all,
  find,
  findByUser,
  create,
  update,
  destroy,
};
