/** @type {typeof import('../app/Exceptions/UnexpectedErrorException')} */
const UnexpectedErrorException = use("App/Exceptions/UnexpectedErrorException");
/** @type {typeof import('../Utils')} */
const { promiseResolver, isPublished } = use("App/Utils");
/** @type {typeof import('../Helper/Entities/talent')} */
const Talent = use("App/Helper/Entities/talent");

/**
 * Check if talent exists on DB.
 *
 * @param {*} data
 * @param {*} field
 * @param {*} message
 * @param {*} args
 * @param {*} get
 */
const existsTalentRule = async (data, field, message, args, get) => {
  const value = get(data, field);
  if (!value) return;

  const [userRoleId, postType] = args;
  const filters = {
    scopesPrivate: {},
  };

  if (postType && isPublished(postType)) {
    filters.scopesPrivate.published = true;
  }

  const [talent, talentError] = await promiseResolver(
    Talent.findByUser(value, userRoleId, filters)
  );

  if (talentError) {
    throw new UnexpectedErrorException().getMessage();
  }

  if (!talent) {
    throw message;
  }
};

module.exports = existsTalentRule;
