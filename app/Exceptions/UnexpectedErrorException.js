"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");
const defaultMessage = "An unexpected error occurred during the process.";
const defaultStatus = 500;
const defaultCode = "E_UNEXPECTED_ERROR";

class UnexpectedErrorException extends LogicalException {
  constructor(message, status, code) {
    super(
      message || defaultMessage,
      status || defaultStatus,
      code || defaultCode
    );
  }
}

module.exports = UnexpectedErrorException;
