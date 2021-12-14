"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const FuncionalTitle = use("App/Models/FuncionalTitle");

/**
 * Gets all functional titles
 *
 * @param {object} payload
 * @return {Promise}
 */
const all = async () => {
  return await FuncionalTitle.query().orderBy("name").fetch();
};

module.exports = {
  all,
};
