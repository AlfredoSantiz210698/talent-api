"use strict";

const ValidationFailureHandler = use("App/Validators/ValidationFailureHandler");
/** @type {typeof import('../../../Utils')} */
const { getAuthJwtPayload } = use("App/Utils");

class TalentShow extends ValidationFailureHandler {
  get data() {
    return this.ctx.params;
  }

  get sanitizationRules() {
    return {
      id: "to_int",
    };
  }

  get rules() {
    return {
      id: `required|integer|exists:companies`,
    };
  }

  get messages() {
    return {
      "id.exists": "Company not found",
    };
  }
}

module.exports = TalentShow;
