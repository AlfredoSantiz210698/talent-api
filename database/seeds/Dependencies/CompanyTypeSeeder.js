"use strict";

/*
|--------------------------------------------------------------------------
| CompanyTypeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const CompanyType = use("App/Models/CompanyType");

class CompanyTypeSeeder {
  async run() {
    const types = this.getTypes();

    for (const type of types) {
      const typeModel = await CompanyType.findBy("name", type.name);

      if (typeModel) {
        typeModel.merge(type);
        await typeModel.save();
      } else {
        await Factory.model("App/Models/CompanyType").create(type);
      }
    }
  }

  getTypes() {
    return [
      {
        name: "Development",
        description: "",
      },
      {
        name: "Video Production",
        description: "",
      },
      {
        name: "Film Company",
        description: "",
      },
    ];
  }
}

module.exports = CompanyTypeSeeder;
