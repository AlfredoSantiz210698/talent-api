"use strict";

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

Factory.blueprint(
  "App/Models/Role",
  (faker, i, { code, name, description }) => {
    return {
      code,
      name,
      description,
    };
  }
);

Factory.blueprint(
  "App/Models/Status",
  (faker, i, { code, name, description }) => {
    return {
      code,
      name,
      description,
    };
  }
);

Factory.blueprint(
  "App/Models/ProcessStatus",
  (faker, i, { code, name, description }) => {
    return {
      code,
      name,
      description,
    };
  }
);

Factory.blueprint(
  "App/Models/Currency",
  (faker, i, { symbol, name, country }) => {
    return {
      symbol,
      name,
      country,
    };
  }
);

Factory.blueprint(
  "App/Models/FuncionalTitle",
  (faker, i, { name, description }) => {
    return {
      name,
      description,
    };
  }
);

Factory.blueprint("App/Models/Seniority", (faker, i, { name }) => {
  return {
    name,
  };
});

Factory.blueprint("App/Models/Industry", (faker, i, { name, description }) => {
  return {
    name,
    description,
  };
});

Factory.blueprint(
  "App/Models/Location",
  (faker, i, { code, name, latitude, longitude, zipcode }) => {
    return {
      code,
      name,
      latitude,
      longitude,
      zipcode,
    };
  }
);

Factory.blueprint(
  "App/Models/CompanyType",
  (faker, i, { name, description }) => {
    return {
      name,
      description,
    };
  }
);

Factory.blueprint(
  "App/Models/Relocation",
  (faker, i, { name, description }) => {
    return {
      name,
      description,
    };
  }
);

Factory.blueprint(
  "App/Models/FileType",
  (faker, i, { code, name, description }) => {
    return {
      code,
      name,
      description,
    };
  }
);

Factory.blueprint(
  "App/Models/User",
  (faker, i, { name, first_name, last_name, email, password }) => {
    return {
      name,
      first_name,
      last_name,
      email,
      password,
    };
  }
);

Factory.blueprint("App/Models/UserRole", (faker, i, { user_id, role_id }) => {
  return {
    user_id,
    role_id,
  };
});

Factory.blueprint(
  "App/Models/UserUser",
  (faker, i, { user_role_parent_id, user_role_id }) => {
    return {
      user_role_parent_id,
      user_role_id,
    };
  }
);
