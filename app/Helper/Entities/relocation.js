"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Relocation = use("App/Models/Relocation");

/**
 * Gets all relocations
 *
 * @param {object} payload
 * @return {Promise}
 */
const all = async () => {
  return await Relocation.query().orderBy("name").fetch();
};

module.exports = {
  all,
};
