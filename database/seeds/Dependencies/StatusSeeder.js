'use strict'

/*
|--------------------------------------------------------------------------
| StatusSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Status = use("App/Models/Status");

class StatusSeeder {
  async run () {
    const statuses = this.getStatuses();

    for (const status of statuses) {
      const statusModel = await Status.findBy("code", status.code);
      
      if (statusModel) {
        statusModel.merge(status);
        await statusModel.save();
      } else {
        await Factory.model("App/Models/Status").create(status);
      }
    }
  }

  getStatuses() {
    return [
      {
        code: "NONE",
        name: "None",
        description: "",
      },
      {
        code: "IN_PROCESS",
        name: "In process",
        description: "",
      },
      {
        code: "REJECTED",
        name: "Rejected",
        description: "",
      },
      {
        code: "ACCEPTED",
        name: "Accepted",
        description: "",
      },
    ];
  }
}

module.exports = StatusSeeder
