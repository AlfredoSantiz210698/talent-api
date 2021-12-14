"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Location = use("App/Models/Location");

/**
 * Gets all locations
 *
 * @param {object} payload
 * @return {Promise}
 */
const all = async () => {
  return await Location.query().orderBy("name").fetch();
};

module.exports = {
  all,
};
