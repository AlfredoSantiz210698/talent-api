'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StatusSchema extends Schema {
  up () {
    this.create('statuses', (table) => {
      table.increments();
      table.string("code", 150).notNullable().unique();
      table.string("name").notNullable();
      table.text("description").nullable();
      table.timestamps();
    })
  }

  down () {
    this.drop('statuses')
  }
}

module.exports = StatusSchema
