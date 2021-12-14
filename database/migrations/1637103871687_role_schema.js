"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RoleSchema extends Schema {
  up() {
    this.create("roles", (table) => {
      table.increments();
      table.string("code", 150).notNullable().unique();
      table.string("name").notNullable();
      table.text("description").nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("roles");
  }
}

module.exports = RoleSchema;
