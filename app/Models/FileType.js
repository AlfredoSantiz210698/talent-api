"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class FileType extends Model {
  files() {
    return this.hasMany("App/Models/TalentFile");
  }
}

module.exports = FileType;
