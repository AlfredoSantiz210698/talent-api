const Database = use("Database");

/**
 * Check if some value exists on DB table.
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

  const [table, column = "id"] = args.splice(0, 2);
  const query = Database.table(table).where(column, value);

  while (args.length > 0) {
    const [column, value] = args.splice(0, 2);
    if (value !== undefined) {
      query.where(column, value);
    }
  }
  
  const row = await query.first();

  if (!row) {
    throw message;
  }
};

module.exports = existsRule;
