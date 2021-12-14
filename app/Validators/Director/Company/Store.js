"use strict";

const ValidationFailureHandler = use("App/Validators/ValidationFailureHandler");

class DirectorCompanyStore extends ValidationFailureHandler {
  get sanitizationRules() {
    return {
      name: "trim",
      email: "trim|normalize_email",
      location_id: "to_int",
      currency_id: "to_int",
    };
  }

  get rules() {
    return {
      name: "required|string|max:255|unique:companies,name",
      email: "required|string|max:255|email|unique:companies,email",
      phone: "required|string|min:10|max:20|phone",
      company_type_id: "required|integer|exists:company_types",
      location_id: "required|integer|exists:locations,id",
      currency_id: "required|integer|exists:currencies",
      latitude: "number",
      longitude: "number",
    };
  }

  get messages() {
    return {
      "name.unique": "Company already exists with this name",
      "email.unique": "Company already exists with this email",
      "location_id.exists": "Location doesn't exists",
      "currency_id.exists": "Currency doesn't exists",
    };
  }
}

module.exports = DirectorCompanyStore;
