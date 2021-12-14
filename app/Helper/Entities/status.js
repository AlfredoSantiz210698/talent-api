"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Status = use("App/Models/Status");

/**
 * Gets all statuses
 *
 * @param {object} payload
 * @return {Promise}
 */
const all = async () => {
  return await Status.all();
};

module.exports = {
  all,
};
