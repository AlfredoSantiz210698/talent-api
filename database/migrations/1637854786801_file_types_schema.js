"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FileTypesSchema extends Schema {
  up() {
    this.create("file_types", (table) => {
      table.increments();
      table.string("code", 150).notNullable().unique();
      table.string("name").notNullable();
      table.text("description").nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("file_types");
  }
}

module.exports = FileTypesSchema;
