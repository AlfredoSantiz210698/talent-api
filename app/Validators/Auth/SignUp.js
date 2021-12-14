"use strict";

const ValidationFailureHandler = use("App/Validators/ValidationFailureHandler");
const { rule } = use("Validator");

class AuthSignUp extends ValidationFailureHandler {
  get sanitizationRules() {
    return {
      name: "trim",
      first_name: "trim",
      last_name: "trim",
      email: "trim|normalize_email",
    };
  }

  get rules() {
    return {
      name: "required|min:2|max:50",
      first_name: "required|min:2|max:50",
      last_name: "required|min:2|max:50",
      email: "required|email|uniqueUser",
      password: [
        rule("required"),
        rule("min", 8),
        rule("max", 60),
        rule("regex", /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
      ],
    };
  }

  get messages() {
    return {
      "password.regex": "The password didn't match with policy",
    };
  }
}

module.exports = AuthSignUp;
