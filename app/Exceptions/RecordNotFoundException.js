"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");
const defaultMessage = "Record not found.";
const defaultStatus = 400;
const defaultCode = "E_RECORD_NOT_FOUND";

class RecordNotFoundException extends LogicalException {
  constructor(message, status, code) {
    super(
      message || defaultMessage,
      status || defaultStatus,
      code || defaultCode
    );
  }
}

module.exports = RecordNotFoundException;
