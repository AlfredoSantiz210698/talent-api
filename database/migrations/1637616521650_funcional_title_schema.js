'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FuncionalTitleSchema extends Schema {
  up () {
    this.create('funcional_titles', (table) => {
      table.increments()
      table.string("name").notNullable();
      table.text("description").nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('funcional_titles')
  }
}

module.exports = FuncionalTitleSchema
