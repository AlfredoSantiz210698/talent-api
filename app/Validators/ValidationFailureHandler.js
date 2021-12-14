"use strict";

class ValidationFailureHandler {
  constructor(response) {
    this.response = response;
  }

  async fails(errors) {
    return this.ctx.response
      .status(400)
      .json(
        ValidationFailureHandler.getJsonErrorResponse(errors, this.response)
      );
  }

  static getJsonErrorResponse(errors, response = {}) {
    return {
      message: response?.message || "Some fields didn't match with rules.",
      name: "ValidationException",
      code: "E_VALIDATION_FAILED",
      errors: ValidationFailureHandler.toNormalizeErrors(errors),
    };
  }

  static toNormalizeErrors(errors) {
    if (!Array.isArray(errors)) return [];

    const errorsNormalized = [];
    for (const error of errors) {
      errorsNormalized.push({
        message: error.message || "",
        field: error.field || error.fieldName || "",
        validation: error.validation || error.type || "",
      });
    }

    return errorsNormalized;
  }
}

module.exports = ValidationFailureHandler;
