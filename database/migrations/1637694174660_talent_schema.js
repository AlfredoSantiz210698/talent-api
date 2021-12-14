"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");
/** @type {typeof import('../../app/Helper/constants')} */
const { DRAFT, PUBLISHED } = use("App/Helper/constants");

class TalentSchema extends Schema {
  up() {
    this.create("talents", (table) => {
      table.increments();
      table
        .integer("user_role_id")
        .unsigned()
        .references("id")
        .inTable("user_roles")
        .notNullable();
      table.string("first_name", 50).notNullable();
      table.string("last_name", 50).notNullable();
      table
        .integer("status_id")
        .unsigned()
        .references("id")
        .inTable("statuses")
        .notNullable();
      table.decimal("wish_salary", 16, 2);
      table
        .integer("funcional_title_id")
        .unsigned()
        .references("id")
        .inTable("funcional_titles")
        .notNullable();
      table.string("title", 100).notNullable();
      table
        .integer("seniority_id")
        .unsigned()
        .references("id")
        .inTable("seniorities")
        .notNullable();
      table
        .integer("industry_id")
        .unsigned()
        .references("id")
        .inTable("industries")
        .notNullable();
      table
        .integer("location_id")
        .unsigned()
        .references("id")
        .inTable("locations")
        .notNullable();
      table
        .integer("relocation_id")
        .unsigned()
        .references("id")
        .inTable("relocations")
        .notNullable();
      table.string("phone", 20).notNullable();
      table.string("email").notNullable();
      table
        .integer("company_id")
        .unsigned()
        .references("id")
        .inTable("companies")
        .notNullable();
      table
        .integer("process_status_id")
        .unsigned()
        .references("id")
        .inTable("process_statuses")
        .notNullable();
      table
        .enum("post_type", [DRAFT, PUBLISHED])
        .notNullable()
        .defaultTo(DRAFT);
      table.text("notes").nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("talents");
  }
}

module.exports = TalentSchema;
