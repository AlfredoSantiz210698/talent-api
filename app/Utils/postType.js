"use strict";
/** @type {typeof import('../Helper/constants')} */
const { PUBLISHED } = use("App/Helper/constants");

/**
 * Check if post type is published.
 *
 * @param {*} value
 * @return {boolean}
 */
const isPublished = (postType) => {
  return postType === PUBLISHED;
};

module.exports = {
  isPublished,
};
