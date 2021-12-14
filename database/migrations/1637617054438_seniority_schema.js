'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SenioritySchema extends Schema {
  up () {
    this.create('seniorities', (table) => {
      table.increments()
      table.string("name").notNullable();
      table.text("description").nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('seniorities')
  }
}

module.exports = SenioritySchema

