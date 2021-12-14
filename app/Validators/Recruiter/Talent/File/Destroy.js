"use strict";

const ValidationFailureHandler = use("App/Validators/ValidationFailureHandler");
/** @type {typeof import('../../../../Utils')} */
const { getAuthJwtPayload } = use("App/Utils");

class Destroy extends ValidationFailureHandler {
  get data() {
    const { talents_id, id } = this.ctx.params;
    const { user_role_id } = getAuthJwtPayload(this.ctx.auth);
    this.payload = {
      user_role_id,
      talents_id,
      id,
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
      id: `required|integer|exists:talent_files,id,talent_id,${this.payload?.talents_id}`,
    };
  }

  get messages() {
    return {
      "talents_id.existsTalent":
        "Talent not found or you don't have permission to access it",
      "id.exists": "File doesn't exists",
    };
  }
}

module.exports = Destroy;
