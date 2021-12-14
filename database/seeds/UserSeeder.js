"use strict";

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
/** @type {typeof import('../../app/Helper/Entities/role')} */
const Role = use("App/Helper/Entities/role");

class UserSeeder {
  async run() {
    const users = await this.getUsers();

    for (const director of users) {
      const directorRoleUser = await this.createUser(director);

      for (const coach of director.coaches) {
        const coachRoleUser = await this.createUser(coach, directorRoleUser);

        for (const recruiter of coach.recruiters) {
          await this.createUser(recruiter, coachRoleUser);
        }
      }
    }
  }

  async getUsers() {
    const directorRole = await Role.getDirector();
    const coachRole = await Role.getCoach();
    const recruiterRole = await Role.getRecruiter();

    return [
      {
        name: "Roberto",
        first_name: "De Anda",
        last_name: "",
        email: "roberto_director@gmail.com",
        password: "#Talent21",
        role_id: directorRole.id,
        coaches: [
          {
            name: "Mario",
            first_name: "Moreno",
            last_name: "",
            email: "mario_coach@gmail.com",
            password: "#Talent21",
            role_id: coachRole.id,
            recruiters: [
              {
                name: "Kevin",
                first_name: "Jhair",
                last_name: "",
                email: "kevin_recruiter@gmail.com",
                password: "#Talent21",
                role_id: recruiterRole.id,
              },
            ],
          },
          {
            name: "Emilio",
            first_name: "E",
            last_name: "",
            email: "emilio_coach@gmail.com",
            password: "#Talent21",
            role_id: coachRole.id,
            recruiters: [
              {
                name: "Cris",
                first_name: "Tovilla",
                last_name: "",
                email: "cris_recruiter@gmail.com",
                password: "#Talent21",
                role_id: recruiterRole.id,
              },
            ],
          },
        ],
      },
    ];
  }

  async createUser(userData, roleUser = null) {
    const user = await Factory.model("App/Models/User").create(userData);
    const userRole = await Factory.model("App/Models/UserRole").create({
      user_id: user.id,
      role_id: userData.role_id,
    });

    if (roleUser) {
      await Factory.model("App/Models/UserUser").create({
        user_role_parent_id: roleUser.id,
        user_role_id: userRole.id,
      });
    }

    return userRole;
  }
}

module.exports = UserSeeder;
