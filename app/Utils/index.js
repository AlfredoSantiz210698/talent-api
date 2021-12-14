"use strict";

/** @type {typeof import('./request')} */
const request = use("./request");
/** @type {typeof import('./dataTypes')} */
const dataTypes = use("./dataTypes");
/** @type {typeof import('./postType')} */
const postType = use("./postType");

module.exports = {
  ...request,
  ...dataTypes,
  ...postType
};
