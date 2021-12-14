"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");
/** @type {typeof import('../app/Helper/Entities/role')} */
const Role = use("App/Helper/Entities/role");

Route.get("/", () => {
  return { gpac: "talent" };
});

/*
  |--------------------------------------------------------------------------
  | Public routes
  |--------------------------------------------------------------------------
  |
  */
Route.group(() => {
  Route.get("/", () => {
    return { gpac: "talent from api v1" };
  });

  Route.post("/auth/signin", "AuthController.signIn").validator("Auth/SignIn");
})
  .prefix("/api/v1/")
  .middleware(["forceJson"]);

/*
  |--------------------------------------------------------------------------
  | Routes for director role.
  |--------------------------------------------------------------------------
  |
  */
Route.group(() => {
  Route.resource("companies", "CompanyController")
    .only(["store", "update"])
    .validator(
      new Map([
        [["companies.store"], ["Director/Company/Store"]],
        [["companies.update"], ["Director/Company/Update"]],
      ])
    );

  Route.resource("talents", "Talent/TalentController")
    .only(["index", "show"])
    .validator(new Map([[["talents.show"], ["Recruiter/Talent/Show"]]]));

  Route.resource("talents.files", "Talent/FileController")
    .only(["index"])
    .validator(
      new Map([[["talents.files.index"], ["Recruiter/Talent/File/Index"]]])
    );
})
  .prefix("/api/v1/directors/")
  .middleware(["forceJson", "auth:jwt", `role:${Role.getDirectorCode()}`])
  .namespace("Director");

Route.group(() => {
  Route.resource("talents", "Talent/TalentController")
    .only(["index", "show", "destroy"])
    .validator(
      new Map([
        [["talents.show"], ["Coach/Talent/Show"]],
        [["talents.destroy"], ["Coach/Talent/Destroy"]],
      ])
    );

  Route.resource("talents.files", "Talent/FileController")
    .only(["index", "destroy"])
    .validator(
      new Map([
        [["talents.files.index"], ["Coach/Talent/File/Index"]],
        [["talents.files.destroy"], ["Coach/Talent/File/Destroy"]],
      ])
    );
})
  .prefix("/api/v1/coaches/")
  .middleware(["forceJson", "auth:jwt", `role:${Role.getCoachCode()}`])
  .namespace("Coach");

Route.group(() => {
  Route.resource("talents", "Talent/TalentController")
    .apiOnly()
    .validator(
      new Map([
        [["talents.store"], ["Recruiter/Talent/Store"]],
        [["talents.show"], ["Recruiter/Talent/Show"]],
        [["talents.update"], ["Recruiter/Talent/Update"]],
        [["talents.destroy"], ["Recruiter/Talent/Destroy"]],
      ])
    );

  Route.resource("talents.files", "Talent/FileController")
    .only(["index", "store", "destroy"])
    .validator(
      new Map([
        [["talents.files.index"], ["Recruiter/Talent/File/Index"]],
        [["talents.files.destroy"], ["Recruiter/Talent/File/Destroy"]],
      ])
    );
})
  .prefix("/api/v1/recruiters/")
  .middleware(["forceJson", "auth:jwt", `role:${Role.getRecruiterCode()}`])
  .namespace("Recruiter");

Route.group(() => {
  Route.resource("industries", "IndustryController").only(["index"]);
  Route.resource("locations", "LocationController").only(["index"]);
  Route.resource("statuses", "StatusController").only(["index"]);
  Route.resource("seniorities", "SeniorityController").only(["index"]);
  Route.resource("process-statuses", "ProcessStatusController").only(["index"]);
  Route.resource("company-types", "CompanyTypeController").only(["index"]);
  Route.resource("relocations", "RelocationController").only(["index"]);
  Route.resource("currencies", "CurrencyController").only(["index"]);
  Route.resource("companies", "Director/CompanyController")
    .only(["index", "show"])
    .validator(new Map([[["companies.show"], ["Director/Company/Show"]]]));
  Route.resource("functional-titles", "FunctionalTitleController").only([
    "index",
  ]);
})
  .prefix("/api/v1/repository")
  .middleware([
    "forceJson",
    "auth:jwt",
    `role:${Role.getDirectorCode()},${Role.getCoachCode()},${Role.getRecruiterCode()}`,
  ]);

Route.any("*", ({ response }) => {
  return response.status(404).json({
    message: "Route not found.",
  });
});
