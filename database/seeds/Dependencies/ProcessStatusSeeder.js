"use strict";

/*
|--------------------------------------------------------------------------
| ProcessStatusSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const ProcessStatus = use("App/Models/ProcessStatus");

class ProcessStatusSeeder {
  async run() {
    const statuses = this.getProcessStatuses();

    for (const status of statuses) {
      const statusModel = await ProcessStatus.findBy("code", status.code);
      
      if (statusModel) {
        statusModel.merge(status);
        await statusModel.save();
      } else {
        await Factory.model("App/Models/ProcessStatus").create(status);
      }
    }
  }

  getProcessStatuses() {
    return [
      {
        code: "NONE",
        name: "None",
        description: "",
      },
      {
        code: "INTERVIEWING",
        name: "Interviewing",
        description: "",
      },
      {
        code: "CHALLENGING",
        name: "Challenging",
        description: "",
      },
      {
        code: "CHALLENGING_FEEDBACK",
        name: "Challenging feedback",
        description: "",
      },
      {
        code: "HIRING",
        name: "Hiring",
        description: "",
      },
      {
        code: "COMPLETED",
        name: "Completed",
        description: "",
      },
    ];
  }
}

module.exports = ProcessStatusSeeder;
