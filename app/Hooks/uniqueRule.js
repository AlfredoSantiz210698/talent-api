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
const existsRule = async (data, field, message, args, get) => {
  const value = get(data, field);
  if (!value) return;

  const [table, column = "id"] = args;

  const row = await Database.table(table).where(column, value).first();

  if (row) {
    throw message;
  }
};

module.exports = existsRule;
