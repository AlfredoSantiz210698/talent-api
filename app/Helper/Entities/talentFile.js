"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const TalentFile = use("App/Models/TalentFile");
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const FileType = use("App/Models/FileType");
/** @type {typeof import('../../Services/storage')} */
const Storage = use("App/Services/storage");
const Database = use("Database");

/**
 * Gets all files.
 *
 * @param {object} payload
 * @return {Promise}
 */
const all = async (talentId) => {
  return await FileType.query()
    .with("files", (builder) => {
      builder.withTalent(talentId);
    })
    .fetch();
};

/**
 * Create a new talent file.
 *
 * @param {object} payload
 * @return {Promise}
 */
const create = async (payload) => {
  return await TalentFile.create(payload);
};

/**
 * Delete a talent file.
 *
 * @param {object} payload
 * @return {Promise}
 */
const destroy = async (id) => {
  const trx = await Database.beginTransaction();

  try {
    const file = await TalentFile.find(id);
    if (!file) return false;

    await Storage.removeByPath(file.path);
    await file.delete(trx);
    await trx.commit();
  } catch (error) {
    await trx.rollback();
    throw error;
  }
};

/**
 * Delete a talent file by model file.
 *
 * @param {object} payload
 * @return {Promise}
 */
const destroyByModel = async (modelFile, trx = null) => {
  if (!modelFile) return false;

  const isOwnTrx = trx === null;
  if (isOwnTrx) {
    trx = await Database.beginTransaction();
  }

  try {
    await Storage.removeByPath(modelFile.path);
    await modelFile.delete(trx);

    if (isOwnTrx) {
      await trx.commit();
    }
  } catch (error) {
    if (isOwnTrx) {
      await trx.rollback();
    }
    throw error;
  }
};

module.exports = {
  all,
  create,
  destroy,
  destroyByModel,
};
