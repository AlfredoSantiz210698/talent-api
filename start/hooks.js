const { hooks } = require("@adonisjs/ignitor");

hooks.after.providersBooted(() => {
  const Validator = use("Validator");
  const existsRule = use("App/Hooks/existsRule");
  const uniqueRule = use("App/Hooks/uniqueRule");
  const uniqueUserRule = use("App/Hooks/uniqueUserRule");
  const existsRoleRule = use("App/Hooks/existsRoleRule");
  const phoneRule = use("App/Hooks/phoneRule");
  const existsTalentRule = use("App/Hooks/existsTalentRule");
  
  Validator.extend("exists", existsRule);
  // Validator.extend("unique", uniqueRule);
  Validator.extend("uniqueUser", uniqueUserRule);
  Validator.extend("existsRole", existsRoleRule);
  Validator.extend("phone", phoneRule);
  Validator.extend("existsTalent", existsTalentRule);
});
