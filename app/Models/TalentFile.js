"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class TalentFile extends Model {
  static scopeWithTalent(query, talentId) {
    return query.where("talent_id", talentId);
  }

  type() {
    return this.hasOne("App/Models/FileType", "file_type_id", "id");
  }
}

module.exports = TalentFile;
