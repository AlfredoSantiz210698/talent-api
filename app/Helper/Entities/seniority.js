"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Seniority = use("App/Models/Seniority");

/**
 * Gets all statuses
 *
 * @param {object} payload
 * @return {Promise}
 */
const all = async () => {
  return await Seniority.all();
};

module.exports = {
  all,
};
