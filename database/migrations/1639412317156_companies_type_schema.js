"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CompaniesTypeSchema extends Schema {
  async up() {
    const exists = await this.hasColumn("companies", "company_type_id");

    if (exists) return;

    this.table("companies", (table) => {
      table
        .integer("company_type_id")
        .unsigned()
        .references("id")
        .inTable("company_types")
        .notNullable()
        .after("currency_id");
    });
  }

  async down() {
    const exists = await this.hasColumn("companies", "company_type_id");
    if (exists) {
      this.table("companies", (table) => {
        table.dropForeign(
          "company_type_id",
          "companies_company_type_id_foreign"
        );
        table.dropColumn("company_type_id");
      });
    }
  }
}

module.exports = CompaniesTypeSchema;
