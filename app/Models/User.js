"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use("Hash");

class User extends Model {
  static get computed() {
    return ["fullname"];
  }

  static get hidden() {
    return ["password"];
  }

  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook("beforeSave", async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  static scopeWithEmail(query, email) {
    return query.where("email", email);
  }

  static scopeWhereHasRole(query, roleId) {
    return query.whereHas("roles", (builder) => {
      builder.where("roles.id", roleId);
    });
  }

  getFullname({ name, first_name, last_name}) {
    return `${name} ${first_name} ${last_name}`.trim();
  }

  roles() {
    return this.belongsToMany("App/Models/Role").pivotModel(
      "App/Models/UserRole"
    );
  }

  rolesPivot() {
    return this.hasMany("App/Models/UserRole");
  }

  users() {
    return this.belongsToMany("App/Models/User").pivotModel(
      "App/Models/UserUser"
    );
  }

  tokens() {
    return this.hasMany("App/Models/Token");
  }
}

module.exports = User;
