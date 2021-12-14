"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
/** @type {typeof import('../Helper/constants')} */
const { PUBLISHED } = use("App/Helper/constants");
/** @type {typeof import('../Utils')} */
const { isFunction, isEmptyObject } = use("App/Utils");

class Talent extends Model {
  static boot() {
    super.boot();
    this.addTrait("QueryFilter");
  }

  static get computed() {
    return ["fullname"];
  }

  static getNamesPublicScopes() {
    return ["published", "byLocationId", "byName", "byIndustryId"];
  }

  static getWithPublicNames() {
    return [
      "status",
      "processStatus",
      "funcionalTitle",
      "seniority",
      "industry",
      "location",
      "relocation",
      "company",
      "files",
    ];
  }

  static getAlwaysWiths() {
    return ["status", "processStatus"];
  }

  static scopePublished(query) {
    return query.where("post_type", PUBLISHED);
  }

  static scopeFindById(query, id) {
    return query.where("id", id);
  }

  static scopeByName(query, name) {
    if (name === null || name === undefined) return query;

    name = `%${name.replace(" ", "")}%`;

    return query.where((builder) => {
      builder
        .where("first_name", "LIKE", name)
        .orWhere("last_name", "LIKE", name);
    });
  }

  static scopeByLocationId(query, ids) {
    if (ids === null || ids === undefined) return query;

    if (!Array.isArray(ids)) {
      ids = [ids];
    }

    return query.whereIn("location_id", ids);
  }

  static scopeByIndustryId(query, ids) {
    if (ids === null || ids === undefined) return query;

    if (!Array.isArray(ids)) {
      ids = [ids];
    }

    return query.whereIn("industry_id", ids);
  }

  static scopeWithUserRole(query, userRoleId) {
    return query.where("user_role_id", userRoleId);
  }

  getFullname({ first_name, last_name }) {
    return `${first_name} ${last_name}`;
  }

  userRole() {
    return this.belongsTo("App/Models/UserRole");
  }

  parentPivot() {
    return this.belongsTo(
      "App/Models/UserUser",
      "user_role_id",
      "user_role_id"
    );
  }

  status() {
    return this.hasOne("App/Models/Status", "status_id", "id");
  }

  processStatus() {
    return this.hasOne("App/Models/ProcessStatus", "process_status_id", "id");
  }

  funcionalTitle() {
    return this.hasOne("App/Models/FuncionalTitle", "funcional_title_id", "id");
  }

  seniority() {
    return this.hasOne("App/Models/Seniority", "seniority_id", "id");
  }

  industry() {
    return this.hasOne("App/Models/Industry", "industry_id", "id");
  }

  location() {
    return this.hasOne("App/Models/Location", "location_id", "id");
  }

  relocation() {
    return this.hasOne("App/Models/Relocation", "relocation_id", "id");
  }

  company() {
    return this.hasOne("App/Models/Company", "company_id", "id");
  }

  files() {
    return this.hasMany("App/Models/TalentFile");
  }
}

module.exports = Talent;
