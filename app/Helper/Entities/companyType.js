"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const CompanyType = use("App/Models/CompanyType");

/**
 * Gets all company types
 *
 * @param {object} payload
 * @return {Promise}
 */
const all = async () => {
  return await CompanyType.query().orderBy("name").fetch();
};

module.exports = {
  all,
};
