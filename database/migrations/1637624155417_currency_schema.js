"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CurrencySchema extends Schema {
  up() {
    this.create("currencies", (table) => {
      table.increments();
      table.string("symbol", 5).notNullable();
      table.string("name").notNullable();
      table.string("country", 100);
      table.timestamps();
    });
  }

  down() {
    this.drop("currencies");
  }
}

module.exports = CurrencySchema;
