/** @type {typeof import('../app/Exceptions/UnexpectedErrorException')} */
const UnexpectedErrorException = use("App/Exceptions/UnexpectedErrorException");
/** @type {typeof import('../app/Utils/index')} */
const { promiseResolver } = use("App/Utils");
/** @type {typeof import('../app/Helper/Entities/role')} */
const Role = use("App/Helper/Entities/role");

/**
 * Check if role exists on DB.
 *
 * @param {*} data
 * @param {*} field
 * @param {*} message
 * @param {*} args
 * @param {*} get
 */
const existsRoleRule = async (data, field, message, args, get) => {
  const value = get(data, field);
  if (!value) return;

  const [role, roleError] = await promiseResolver(Role.isExistsById(value));
  if (roleError) {
    throw new UnexpectedErrorException().getMessage();
  }

  if (!role) {
    throw message;
  }
};

module.exports = existsRoleRule;
