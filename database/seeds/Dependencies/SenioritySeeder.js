"use strict";

/*
|--------------------------------------------------------------------------
| SenioritySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Seniority = use("App/Models/Seniority");

class SenioritySeeder {
  async run() {
    const seniorities = this.getSeniorities();

    for (const seniority of seniorities) {
      const seniorityModel = await Seniority.findBy("name", seniority.name);

      if (!seniorityModel) {
        await Factory.model("App/Models/Seniority").create(seniority);
      }
    }
  }

  getSeniorities() {
    return [
      {
        name: "Less than 6 months",
      },
      {
        name: "Between 6 months and 1 year",
      },
      {
        name: "More than 1 year up to 4 years",
      },
      {
        name: "More than 4 years up to 9 years",
      },
      {
        name: "More than 9 years to 14 years",
      },
      {
        name: "More than 14 years to 19 years",
      },
      {
        name: "More than 19 years to 24 years",
      },
      {
        name: "25 years or more",
      },
    ];
  }
}

module.exports = SenioritySeeder;
