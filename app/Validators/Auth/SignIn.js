"use strict";

const ValidationFailureHandler = use("App/Validators/ValidationFailureHandler");

class AuthSignIn extends ValidationFailureHandler {
  constructor() {
    super({ message: "There was a problem with authentication" });
  }

  get sanitizationRules() {
    return {
      role_id: "to_int",
      email: "trim|normalize_email",
      password: "trim",
    };
  }

  get rules() {
    return {
      role_id: "integer|min:1|existsRole",
      email: "required|string|max:255|email|exists:users,email",
      password: "required|string|max:60",
    };
  }

  get messages() {
    return {
      "email.exists": "User doesn't exists",
    };
  }
}

module.exports = AuthSignIn;
