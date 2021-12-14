"use strict";

const ValidationFailureHandler = use("App/Validators/ValidationFailureHandler");
/** @type {typeof import('../../../../Utils')} */
const { getAuthJwtPayload } = use("App/Utils");

class Index extends ValidationFailureHandler {
  get data() {
    const { talents_id } = this.ctx.params;
    const { user_role_id } = getAuthJwtPayload(this.ctx.auth);
    this.payload = {
      user_role_id,
      talents_id,
    };

    return this.payload;
  }

  get sanitizationRules() {
    return {
      talents_id: "to_int",
      id: "to_int",
    };
  }

  get rules() {
    return {
      talents_id: `required|integer|existsTalent:${this.payload?.user_role_id}`,
    };
  }

  get messages() {
    return {
      "talents_id.existsTalent":
        "Talent not found or you don't have permission to access it",
    };
  }
}

module.exports = Index;
