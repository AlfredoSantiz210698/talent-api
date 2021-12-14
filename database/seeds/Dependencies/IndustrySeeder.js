"use strict";

/*
|--------------------------------------------------------------------------
| IndustrySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Industry = use("App/Models/Industry");

class IndustrySeeder {
  async run() {
    const industries = this.getIndustries();

    for (const industry of industries) {
      const industryModel = await Industry.findBy("name", industry.name);

      if (!industryModel) {
        await Factory.model("App/Models/Industry").create(industry);
      }
    }
  }

  getIndustries() {
    return [
      {
        name: "Construction",
        description: "",
      },
      {
        name: "Human Services",
        description: "",
      },
      {
        name: "Retail",
        description: "",
      },
    ];
  }
}

module.exports = IndustrySeeder;
