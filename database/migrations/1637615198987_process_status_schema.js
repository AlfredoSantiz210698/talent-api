'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProcessStatusSchema extends Schema {
  up () {
    this.create('process_statuses', (table) => {
      table.increments()
      table.string("code", 150).notNullable().unique();
      table.string("name").notNullable();
      table.text("description").nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('process_statuses')
  }
}

module.exports = ProcessStatusSchema
