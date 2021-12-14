"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class UserUser extends Model {
  static scopeWithParent(query, userRoleId) {
    return query.whereHas("parentPivot", (builder) => {
      builder.where("user_role_id", userRoleId);
    });
  }

  userRole() {
    return this.hasOne("App/Models/UserRole", "user_role_id", "id");
  }

  childrenPivot() {
    return this.hasMany(
      "App/Models/UserUser",
      "user_role_id",
      "user_role_parent_id"
    )
      .with("userRole")
      .with("childrenPivot");
  }

  parentPivot() {
    return this.belongsTo(
      "App/Models/UserUser",
      "user_role_parent_id",
      "user_role_id",
    ).with("parentPivot");
  }
}

module.exports = UserUser;
