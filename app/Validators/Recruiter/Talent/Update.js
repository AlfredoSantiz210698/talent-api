"use strict";

const ValidationFailureHandler = use("App/Validators/ValidationFailureHandler");
/** @type {typeof import('../../../Helper/constants')} */
const { DRAFT, PUBLISHED } = use("App/Helper/constants");
/** @type {typeof import('../../../Utils')} */
const { getAuthJwtPayload } = use("App/Utils");

class RecruiterTalentUpdate extends ValidationFailureHandler {
  get data() {
    const requestBody = this.ctx.request.all();
    const { id } = this.ctx.params;
    this.userRoleId = getAuthJwtPayload(this.ctx.auth).user_role_id;

    return Object.assign({}, requestBody, { id });
  }

  get sanitizationRules() {
    return {
      id: "to_int",
      first_name: "trim",
      last_name: "trim",
      status_id: "to_int",
      funcional_title_id: "to_int",
      title: "trim",
      seniority_id: "to_int",
      industry_id: "to_int",
      location_id: "to_int",
      relocation_id: "to_int",
      phone: "trim",
      email: "trim|normalize_email",
      company_id: "to_int",
      process_status_id: "to_int",
      post_type: "trim",
    };
  }

  get rules() {
    return {
      id: `required|integer|existsTalent:${this.userRoleId}`,
      first_name: "string|min:2|max:50",
      last_name: "string|min:2|max:50",
      status_id: "integer|exists:statuses",
      wish_salary: "number|min:0",
      funcional_title_id: "integer|exists:funcional_titles",
      title: "string|max:100",
      seniority_id: "integer|exists:seniorities",
      industry_id: "integer|exists:industries",
      location_id: "integer|exists:locations",
      relocation_id: "integer|exists:relocations",
      phone: "string|min:10|max:20|phone",
      email: "string|max:255|email",
      company_id: "integer|exists:companies",
      process_status_id: "integer|exists:process_statuses",
      post_type: `string|in:${DRAFT},${PUBLISHED}`,
    };
  }

  get messages() {
    return {
      "id.existsTalent": "Talent not found or you don't have permission to access it",
      "status_id.exists": "Status doesn't exists",
      "funcional_title_id.exists": "Funcional title doesn't exists",
      "seniority_id.exists": "Seniority doesn't exists",
      "industry_id.exists": "Industry doesn't exists",
      "location_id.exists": "Location doesn't exists",
      "relocation_id.exists": "Relocation doesn't exists",
      "company_id.exists": "Company doesn't exists",
      "process_status_id.exists": "Process status doesn't exists",
    };
  }
}

module.exports = RecruiterTalentUpdate;
