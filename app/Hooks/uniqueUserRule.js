/** @type {typeof import('../app/Exceptions/UnexpectedErrorException')} */
const UnexpectedErrorException = use("App/Exceptions/UnexpectedErrorException");
/** @type {typeof import('../app/Utils/index')} */
const { promiseResolver } = use("App/Utils");
/** @type {typeof import('../app/Helper/Entities/role')} */
const Role = use("App/Helper/Entities/role");
/** @type {typeof import('../app/Helper/Entities/user')} */
const User = use("App/Helper/Entities/user");

/**
 * Check if user is already exists.
 * 
 * @param {*} data 
 * @param {*} field 
 * @param {*} message 
 * @param {*} args 
 * @param {*} get 
 */
const uniqueUserRule = async (data, field, message, args, get) => {
  const value = get(data, field);
  if (!value) return;

  const [role, roleError] = await promiseResolver(Role.getRoot());
  if (roleError) {
    throw new UnexpectedErrorException().getMessage();
  }

  const [exists, existsError] = await promiseResolver(
    User.first({
      role_id: role.id,
      email: value,
    })
  );

  if (existsError) {
    throw new UnexpectedErrorException().getMessage();
  }

  if (exists) {
    throw "User already exists.";
  }
};

module.exports = uniqueUserRule;
