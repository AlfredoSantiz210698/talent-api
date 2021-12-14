const Database = use("Database");

/**
 * Check if some value is unique.
 *
 * @param {*} data
 * @param {*} field
 * @param {*} message
 * @param {*} args
 * @param {*} get
 */
const phoneRule = async (data, field, message, args, get) => {
  const value = get(data, field);
  if (!value) return;
  const regexPhone =
    /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/;

  if (!regexPhone.test(String(value).toLowerCase())) {
    throw message;
  }
};

module.exports = phoneRule;
