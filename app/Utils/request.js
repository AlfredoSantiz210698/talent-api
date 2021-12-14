"use strict";

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use("Env");
/** @type {typeof import('./dataTypes')} */
const { isEmptyObject, isObject, toObjectParse } = use("App/Utils/dataTypes");
const bytes = require("bytes");
const getStream = require("get-stream");

const _validateFile = (file, rules) => {
  if (rules.required && !file) {
    return {
      fieldName: rules.fieldName || "",
      clientName: "",
      message: `${rules.fieldName || ""} is required`,
      type: "type",
    };
  }

  if (file.validationOptions.hasOwnProperty("size")) {
    const maxFileSizeInMb = parseInt(Env.get("MAX_FILE_SIZE_IN_MB"));
    if (
      file.stream.byteCount > maxFileSizeInMb ||
      file.stream.byteCount > file.validationOptions.size
    ) {
      return {
        fieldName: rules.fieldName || "",
        clientName: "",
        message: `File size should be less than ${bytes.format(
          file.validationOptions.size
        )}`,
        type: "type",
      };
    }
  }

  return null;
};

/**
 * Process file manually.
 *
 * @param {Request} ctx.request
 * @param {object} validationRules
 * @return {Promise}
 */
const setProcessFile = async (request, validationRules = {}) => {
  const fileData = {};
  const multipart = {
    accessed: false,
  };
  
  request.multipart.file(
    validationRules.fieldName,
    validationRules,
    async (file) => {
      multipart.accessed = true;

      const error = _validateFile(file, validationRules);
      if (!isEmptyObject(error)) {
        fileData.errors = [error];
        return;
      }

      file._validateFn();
      if (!isEmptyObject(file._error)) {
        fileData.errors = [file._error];
        return;
      }

      fileData.clientName = file.clientName;
      fileData.extname = file.extname;
      fileData.content = await getStream.buffer(file.stream);
      fileData.contentType = file.headers["content-type"];
    }
  );

  // if (validationRules.required && !multipart.accessed) {
  //   fileData.errors = [
  //     {
  //       fieldName: validationRules.fieldName,
  //       clientName: "",
  //       message: `${validationRules.fieldName || ""} is required`,
  //       type: "type",
  //     },
  //   ];
  // }

  return fileData;
};

/**
 * Process body manually.
 *
 * @param {Request} ctx.request
 * @return {Promise}
 */
const setProcessFields = (request) => {
  let payload = {};

  request.multipart.field((name, value) => {
    payload[name] = value;
  });

  return payload;
};

/**
 * Get filters coming from request.
 *
 * @param {*} filters
 * @return {object}
 */
const getRequestFilter = (filters) => {
  if (!isObject(filters)) {
    filters = toObjectParse(filters);
  }

  const { pagination = {}, query = {}, withs = {} } = filters;

  return { pagination, query, withs };
};

/**
 * Gets payload from pagination.
 *
 * @param {*} pagination
 * @return {object}
 */
const getPaginationPayload = (pagination) => {
  const { page = 1, perPage = 20 } = isObject(pagination) ? pagination : {};
  return { page, perPage };
};

/**
 * Resolve a promise.
 *
 * @param {*} promise
 * @return {array}
 */
const promiseResolver = async (promise) => {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

/**
 * Gets payload from auth request.
 *
 * @param {*} auth
 * @return {object}
 */
const getAuthJwtPayload = (auth) => {
  return auth?.authenticatorInstance?.jwtPayload?.data || {};
  // const token = auth.getAuthHeader(["bearer", "token"]);
  // return (await auth._verifyToken(token)).data;
};

module.exports = {
  setProcessFile,
  setProcessFields,
  getRequestFilter,
  promiseResolver,
  getAuthJwtPayload,
  getPaginationPayload,
};
