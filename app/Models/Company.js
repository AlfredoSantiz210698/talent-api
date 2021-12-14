"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
/** @type {typeof import('../Utils')} */
const { isFunction, isEmptyObject, isEmptyArray } = use("App/Utils");

class Company extends Model {
  static boot() {
    super.boot();
    this.addTrait("QueryFilter");
  }

  static getWithPublicNames() {
    return ["location", "type"];
  }

  static getNamesPublicScopes() {
    return ["byLocationId", "byName"];
  }

  static scopeByName(query, name) {
    if (name === null || name === undefined) return query;

    return query.where("name", "LIKE", `%${name.replace(" ", "")}%`);
  }

  static scopeFindById(query, id) {
    return query.where("id", id);
  }

  static scopeByLocationId(query, ids) {
    if (ids === null || ids === undefined) return query;

    if (!Array.isArray(ids)) {
      ids = [ids];
    }

    return query.whereIn("location_id", ids);
  }

  getLongitude(longitude) {
    return Number(longitude);
  }

  getLatitude(latitude) {
    return Number(latitude);
  }

  location() {
    return this.hasOne("App/Models/Location", "location_id", "id");
  }

  type() {
    return this.hasOne("App/Models/CompanyType", "company_type_id", "id");
  }

  currency() {
    return this.hasOne("App/Models/Currency");
  }
}

module.exports = Company;
