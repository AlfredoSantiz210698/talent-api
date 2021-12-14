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
const RoleSeeder = require("./Dependencies/RoleSeeder");
const StatusSeeder = require("./Dependencies/StatusSeeder");
const ProcessStatusSeeder = require("./Dependencies/ProcessStatusSeeder");
const FuncionalTitleSeeder = require("./Dependencies/FuncionalTitleSeeder");
const SenioritySeeder = require("./Dependencies/SenioritySeeder");
const IndustrySeeder = require("./Dependencies/IndustrySeeder");
const LocationSeeder = require("./Dependencies/LocationSeeder");
const RelocationSeeder = require("./Dependencies/RelocationSeeder");
const CurrencySeeder = require("./Dependencies/CurrencySeeder");
const FileTypeSeeder = require("./Dependencies/FileTypeSeeder");
const CompanyTypeSeeder = require("./Dependencies/CompanyTypeSeeder");

class Dependencies {
  async run() {
    await new RoleSeeder().run();
    await new StatusSeeder().run();
    await new ProcessStatusSeeder().run();
    await new FuncionalTitleSeeder().run();
    await new SenioritySeeder().run();
    await new IndustrySeeder().run();
    await new LocationSeeder().run();
    await new RelocationSeeder().run();
    await new CurrencySeeder().run();
    await new FileTypeSeeder().run();
    await new CompanyTypeSeeder().run();
  }
}

module.exports = Dependencies;
