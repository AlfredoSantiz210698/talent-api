"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");
const defaultMessage = "Not authorized for the process.";
const defaultStatus = 400;
const defaultCode = "E_NOT_AUTHORIZED";

class NotAuthorizedException extends LogicalException {
  constructor(message, status, code) {
    super(
      message || defaultMessage,
      status || defaultStatus,
      code || defaultCode
    );
  }
}

module.exports = NotAuthorizedException;
