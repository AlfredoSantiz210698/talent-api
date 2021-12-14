"use strict";

/*
|--------------------------------------------------------------------------
| RelocationSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Relocation = use("App/Models/Relocation");

class RelocationSeeder {
  async run() {
    const relocations = this.getRelocations();

    for (const relocation of relocations) {
      const relocationModel = await Relocation.findBy("name", relocation.name);

      if (relocationModel) {
        relocationModel.merge(relocation);
        await relocationModel.save();
      } else {
        await Factory.model("App/Models/Relocation").create(relocation);
      }
    }
  }

  getRelocations() {
    return [
      {
        name: "Permanent Off-Site",
        description: "",
      },
      {
        name: "Temporary Off-Site/On-Site",
        description: "",
      },
      {
        name: "Tenant-In-Place",
        description: "",
      },
    ];
  }
}

module.exports = RelocationSeeder;
