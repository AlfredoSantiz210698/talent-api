"use strict";

/** @type {typeof import('../Models/Role')} */
const Role = use("App/Models/Role");

/**
 * Gets code of root role.
 *
 * @return {String}
 */
const getRootCode = () => {
  return "ROOT";
};

/**
 * Gets code of director role.
 *
 * @return {String}
 */
const getDirectorCode = () => {
  return "DIRECTOR";
};

/**
 * Gets code of coach role.
 *
 * @return {String}
 */
const getCoachCode = () => {
  return "COACH";
};

/**
 * Gets code of recruiter role.
 *
 * @return {String}
 */
const getRecruiterCode = () => {
  return "RECRUITER";
};

/**
 * Gets root role.
 *
 * @return {Promise}
 */
const getRoot = async () => {
  return await Role.findBy("code", getRootCode());
};

/**
 * Gets director role.
 *
 * @return {Promise}
 */
const getDirector = async () => {
  return await Role.findBy("code", getDirectorCode());
};

/**
 * Gets Coach role.
 *
 * @return {Promise}
 */
const getCoach = async () => {
  return await Role.findBy("code", getCoachCode());
};

/**
 * Gets Recruiter role.
 *
 * @return {Promise}
 */
const getRecruiter = async () => {
  return await Role.findBy("code", getRecruiterCode());
};

/**
 * Check if exists role by id.
 *
 * @param {object} payload
 * @return User|null
 */
const isExistsById = async (id) => {
  return (await Role.find(id)) ? true : false;
};

/**
 * Find role by id.
 *
 * @param {*} id
 */
const findById = async (id) => {
  return await Role.find(id);
};

module.exports = {
  getRoot,
  getDirector,
  getCoach,
  getRecruiter,
  getRootCode,
  getDirectorCode,
  getCoachCode,
  getRecruiterCode,
  isExistsById,
  findById,
};
