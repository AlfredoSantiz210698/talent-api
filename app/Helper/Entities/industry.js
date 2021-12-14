"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Industry = use("App/Models/Industry");

/**
 * Gets all industries
 *
 * @param {object} payload
 * @return {Promise}
 */
const all = async () => {
  return await Industry.query().orderBy("name").fetch();
};

module.exports = {
  all,
};
