"use strict";

const ValidationFailureHandler = use("App/Validators/ValidationFailureHandler");
/** @type {typeof import('../../../Helper/constants')} */
const { DRAFT, PUBLISHED } = use("App/Helper/constants");

class TalentStore extends ValidationFailureHandler {
  get sanitizationRules() {
    return {
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
      first_name: "required|string|min:2|max:50",
      last_name: "required|string|min:2|max:50",
      status_id: "required|integer|exists:statuses",
      wish_salary: "required|number|min:0",
      funcional_title_id: "required|integer|exists:funcional_titles",
      title: "required|string|max:100",
      seniority_id: "required|integer|exists:seniorities",
      industry_id: "required|integer|exists:industries",
      location_id: "required|integer|exists:locations",
      relocation_id: "required|integer|exists:relocations",
      phone: "required|string|min:10|max:20|phone",
      email: "required|string|max:255|email",
      company_id: "required|integer|exists:companies",
      process_status_id: "required|integer|exists:process_statuses",
      post_type: `required|string|in:${DRAFT},${PUBLISHED}`,
    };
  }

  get messages() {
    return {
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

module.exports = TalentStore;
