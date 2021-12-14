"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class UserRole extends Model {
  static scopeWithEmail(query, email) {
    return query.whereHas("user", (builder) => {
      builder.where("email", email);
    });
  }

  usersRolesChild() {
    return this.belongsToMany(
      "App/Models/UserRole",
      "user_role_parent_id",
      "user_role_id"
    )
      .pivotTable("user_users")
      .with("usersRolesChild")
      .with("role");
  }

  user() {
    return this.belongsTo("App/Models/User");
  }

  role() {
    return this.hasOne("App/Models/Role", "role_id", "id");
  }

  talents() {
    return this.hasMany("App/Models/Talent", "user_role_id", "id");
  }
}

module.exports = UserRole;
