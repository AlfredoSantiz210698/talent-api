"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Company = use("App/Models/Company");
/** @type {typeof import('../../Utils')} */
const { isObject, getPaginationPayload } = use("App/Utils");
/**
 * Gets all companies
 *
 * @param {object} payload
 * @return {Promise}
 */
const all = async (filters) => {
  const {
    pagination = {},
    query = {},
    scopesPrivate = {},
    withs = {},
  } = isObject(filters) ? filters : {};

  const { page, perPage } = getPaginationPayload(pagination);
  const companyQuery = Company.toFilterQuery({
    builder: Company.query(),
    query,
    scopesPrivate,
    withs,
  });

  return await companyQuery.paginate(page, perPage);
};

/**
 * Find some company by id.
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

  const companyQuery = Company.toFilterQuery({
    builder: Company.query().findById(id),
    query,
    scopesPrivate,
    withs,
  });

  return await companyQuery.first();
};

/**
 * Create a new company.
 *
 * @param {*} payload
 * @return {Promise}
 */
const create = async (payload) => {
  return await Company.create(payload);
};

/**
 * Update a company.
 *
 * @param {int} id
 * @param {object} payload
 * @return {Promise}
 */
const update = async (id, payload) => {
  const company = await Company.find(id);

  if (!company) return false;

  company.merge(payload);
  await company.save();

  return company;
};

module.exports = {
  all,
  find,
  create,
  update
};
