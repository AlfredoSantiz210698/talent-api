"use strict";

/*
|--------------------------------------------------------------------------
| FileTypeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const FileType = use("App/Models/FileType");

class FileTypeSeeder {
  async run() {
    const types = this.getTypes();

    for (const type of types) {

      const typeModel = await FileType.findBy("code", type.code);

      if (typeModel) {
        typeModel.merge(type);
        await typeModel.save();
      } else {
        await Factory.model("App/Models/FileType").create(type);
      }
    }
  }

  getTypes() {
    return [
      {
        code: "RESUME",
        name: "Resume",
        description: "",
      },
      {
        code: "COVER_LETTER",
        name: "Cover Letter",
        description: "",
      },
      {
        code: "PORTFOLIO",
        name: "Portfolio",
        description: "",
      },
      {
        code: "REFERENCE_CHECK",
        name: "Reference Check",
        description: "",
      },
      {
        code: "FEE_AGREEMENT",
        name: "Fee Agreement",
        description: "",
      },
    ];
  }
}

module.exports = FileTypeSeeder;
