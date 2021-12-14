"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Currency = use("App/Models/Currency");

/**
 * Gets all currencies
 *
 * @param {object} payload
 * @return {Promise}
 */
const all = async () => {
  return await Currency.query().orderBy("name").fetch();
};

module.exports = {
  all,
};
