"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RelocationSchema extends Schema {
  up() {
    this.create("relocations", (table) => {
      table.increments();
      table.string("name").notNullable();
      table.text("description").nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("relocations");
  }
}

module.exports = RelocationSchema;
