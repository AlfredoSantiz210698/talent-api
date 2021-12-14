"use strict";

const ValidationFailureHandler = use("App/Validators/ValidationFailureHandler");
const { sanitize } = use("Validator");
const { validate } = use("Validator");
/** @type {typeof import('../../../../Utils')} */
const { isEmptyObject } = use("App/Utils");

class Store extends ValidationFailureHandler {
  static singleton = null;

  get sanitizationRules() {
    return {
      talents_id: "to_int",
      file_type_code: "trim",
    };
  }

  get rules() {
    return {
      talents_id: `required|integer|existsTalent:${this.userRoleId}`,
      file_type_code: "required|exists:file_types,code",
    };
  }

  get fileRules() {
    return {
      file: {
        fieldName: "file",
        required: true,
        types: ["application", "pdf"],
        size: "10MB",
        extnames: ["pdf"],
      },
    };
  }

  get messages() {
    return {
      "talents_id.existsTalent":
        "Talent not found or you don't have permission to access it",
      "file_type_code.exists": "File type doesn't exists",
    };
  }

  static getInstante() {
    if (!this.singleton) {
      this.singleton = new Store();
    }

    return this.singleton;
  }

  static getFilesRules(inputName) {
    return this.getInstante().fileRules[inputName] || {};
  }

  static async validate(data, classAttributes = {}) {
    if (!isEmptyObject(classAttributes)) {
      for (let [key, value] of Object.entries(classAttributes)) {
        this.getInstante()[key] = value;
      }
    }

    this.getInstante().validation = await validate(
      sanitize(data, this.getInstante().sanitizationRules),
      this.getInstante().rules,
      this.getInstante().messages,
      this.getInstante().formatter
    );

    return this.getInstante().validation;
  }

  static getValidation() {
    if (!this.getInstante().validation) {
      throw new Error("You must first start the validator");
    }

    return this.getInstante().validation;
  }
}

module.exports = Store;
