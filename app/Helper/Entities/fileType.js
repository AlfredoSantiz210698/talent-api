"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const FileType = use("App/Models/FileType");

/**
 * Gets file type by code.
 *
 * @param {object} payload
 * @return {Promise}
 */
const findByCode = async (code) => {
  return await FileType.findBy("code", code);
};

module.exports = {
  findByCode,
};
