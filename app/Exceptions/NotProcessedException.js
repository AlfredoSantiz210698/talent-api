"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");
const defaultMessage = "Not processed.";
const defaultStatus = 400;
const defaultCode = "E_NOT_PROCESSED";

class NotProcessedException extends LogicalException {
  constructor(message, status, code) {
    super(
      message || defaultMessage,
      status || defaultStatus,
      code || defaultCode
    );
  }
}

module.exports = NotProcessedException;
