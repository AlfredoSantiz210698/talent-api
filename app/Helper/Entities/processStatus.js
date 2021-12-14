"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ProcessStatus = use("App/Models/ProcessStatus");

/**
 * Gets all process statuses
 *
 * @param {object} payload
 * @return {Promise}
 */
const all = async () => {
  return await ProcessStatus.all();
};

module.exports = {
  all,
};
