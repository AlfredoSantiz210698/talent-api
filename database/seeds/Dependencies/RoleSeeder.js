"use strict";

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Role = use("App/Models/Role");

class RoleSeeder {
  async run() {
    const roles = this.getRoles();

    for (const role of roles) {
      const roleModel = await Role.findBy("code", role.code);
      
      if (roleModel) {
        roleModel.merge(role);
        await roleModel.save();
      } else {
        await Factory.model("App/Models/Role").create(role);
      }
    }
  }

  getRoles() {
    return [
      {
        code: "ROOT",
        name: "Root",
        description: "This user has all privileges of app",
      },
      {
        code: "DIRECTOR",
        name: "Director",
        description: "",
      },
      {
        code: "COACH",
        name: "Coach",
        description: "",
      },
      {
        code: "RECRUITER",
        name: "Recruiter",
        description: "",
      },
    ];
  }
}

module.exports = RoleSeeder;
