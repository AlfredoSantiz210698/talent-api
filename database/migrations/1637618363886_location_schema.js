"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LocationSchema extends Schema {
  up() {
    this.create("locations", (table) => {
      table.increments();
      table.string("code", 150).notNullable();
      table.string("name").notNullable();
      table.decimal("latitude", 16, 8).notNullable();
      table.decimal("longitude", 16, 8).notNullable();
      table.string("zipcode", 10).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("locations");
  }
}

module.exports = LocationSchema;
