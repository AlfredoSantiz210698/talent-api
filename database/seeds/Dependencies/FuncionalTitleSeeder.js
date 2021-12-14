"use strict";

/*
|--------------------------------------------------------------------------
| FuncionalTitleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const FuncionalTitle = use("App/Models/FuncionalTitle");

class FuncionalTitleSeeder {
  async run() {
    const titles = this.getTitles();

    for (const title of titles) {
      const titleModel = await FuncionalTitle.findBy("name", title.name);

      if (!titleModel) {
        await Factory.model("App/Models/FuncionalTitle").create(title);
      }
    }
  }

  getTitles() {
    return [
      {
        name: "Backend developer",
        description: "",
      },
      {
        name: "Project manager",
        description: "",
      },
      {
        name: "Server management",
        description: "",
      },
      {
        name: "Database developer",
        description: "",
      },
    ];
  }
}

module.exports = FuncionalTitleSeeder;
