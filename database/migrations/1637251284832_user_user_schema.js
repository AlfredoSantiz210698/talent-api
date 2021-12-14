"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserUserSchema extends Schema {
  up() {
    this.create("user_users", (table) => {
      table.increments();
      table
        .integer("user_role_parent_id")
        .unsigned()
        .references("id")
        .inTable("user_roles")
        .notNullable();
      table
        .integer("user_role_id")
        .unsigned()
        .references("id")
        .inTable("user_roles")
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("user_users");
  }
}

module.exports = UserUserSchema;
