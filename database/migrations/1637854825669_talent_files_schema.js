"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TalentFilesSchema extends Schema {
  up() {
    this.create("talent_files", (table) => {
      table.increments();
      table
        .integer("talent_id")
        .unsigned()
        .references("id")
        .inTable("talents")
        .notNullable();
      table
        .integer("file_type_id")
        .unsigned()
        .references("id")
        .inTable("file_types")
        .notNullable();
      table.string("name").nullable();
      table.string("extension", 10).nullable();
      table.string("path").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("talent_files");
  }
}

module.exports = TalentFilesSchema;
