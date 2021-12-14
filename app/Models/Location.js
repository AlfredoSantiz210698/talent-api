"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Location extends Model {
  static get hidden() {
    return ["created_at", "updated_at"];
  }

  getLongitude(longitude) {
    return Number(longitude);
  }

  getLatitude(latitude) {
    return Number(latitude);
  }
}

module.exports = Location;
