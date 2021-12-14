"use strict";

const ValidationFailureHandler = use("App/Validators/ValidationFailureHandler");

class DirectorCompanyUpdate extends ValidationFailureHandler {
  get data() {
    const requestBody = this.ctx.request.all();
    const { id } = this.ctx.params;

    return Object.assign({}, requestBody, { id });
  }

  get sanitizationRules() {
    return {
      id: "to_int",
      name: "trim",
      email: "trim|normalize_email",
      location_id: "to_int",
      currency_id: "to_int",
    };
  }

  get rules() {
    const companyId = this.ctx.params.id;

    return {
      id: "required|integer|exists:companies",
      name: `string|max:255|unique:companies,name,id,${companyId}`,
      email: `string|max:255|email|unique:companies,email,id,${companyId}`,
      phone: "string|min:10|max:20|phone",
      company_type_id: "integer|exists:company_types",
      location_id: "integer|exists:locations,id",
      currency_id: "integer|exists:currencies",
      latitude: "number",
      longitude: "number",
    };
  }

  get messages() {
    return {
      "id.exists": "Company not found",
      "name.unique": "Company already exists with this name",
      "email.unique": "Company already exists with this email",
      "location_id.exists": "Location doesn't exists",
      "currency_id.exists": "Currency doesn't exists",
    };
  }
}

module.exports = DirectorCompanyUpdate;
