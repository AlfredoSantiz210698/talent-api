"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CompanySchema extends Schema {
  up() {
    this.create("companies", (table) => {
      table.increments();
      table.string("name").notNullable();
      table.string("email").nullable();
      table.string("phone", 20).nullable();
      table.decimal("latitude", 16, 8).nullable();
      table.decimal("longitude", 16, 8).nullable();
      table
        .integer("location_id")
        .unsigned()
        .references("id")
        .inTable("locations")
        .notNullable();
      table
        .integer("currency_id")
        .unsigned()
        .references("id")
        .inTable("currencies")
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("companies");
  }
}

module.exports = CompanySchema;
