"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");
const defaultMessage = "An unexpected error occurred during record creation.";
const defaultStatus = 500;
const defaultCode = "E_RECORD_NOT_CREATED";

class RecordNotCreatedException extends LogicalException {
  constructor(message, status, code) {
    super(
      message || defaultMessage,
      status || defaultStatus,
      code || defaultCode
    );
  }
}

module.exports = RecordNotCreatedException;
