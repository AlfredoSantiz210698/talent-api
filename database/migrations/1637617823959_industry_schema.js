'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IndustrySchema extends Schema {
  up () {
    this.create('industries', (table) => {
      table.increments()
      table.string("name").notNullable();
      table.text("description").nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('industries')
  }
}

module.exports = IndustrySchema
