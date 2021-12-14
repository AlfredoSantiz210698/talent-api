"use strict";

/*
|--------------------------------------------------------------------------
| LocationSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Location = use("App/Models/Location");

class LocationSeeder {
  async run() {
    const locations = this.getLocations();

    for (const location of locations) {
      const locationModel = await Location.findBy("code", location.code);
      
      if (locationModel) {
        locationModel.merge(location);
        await locationModel.save();
      } else {
        await Factory.model("App/Models/Location").create(location);
      }
    }
  }

  getLocations() {
    return [
      {
        code: "NY",
        name: "New York",
        zipcode: "10001",
        latitude: 40.7311390,
        longitude: -73.9884651,
      },
      {
        code: "CA",
        name: "California",
        zipcode: "90011",
        latitude: 37.0598259,
        longitude: -119.7051071,
      },
      {
        code: "NJ",
        name: "New Jersey",
        zipcode: "07097",
        latitude: 40.1520558,
        longitude: -74.3702998,
      },
      {
        code: "TX",
        name: "Texas",
        zipcode: "75217",
        latitude: 31.8013105,
        longitude: -98.8284441,
      },
    ];
  }
}

module.exports = LocationSeeder;
