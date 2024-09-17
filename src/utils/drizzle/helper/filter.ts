import { PgTableWithColumns, TableConfig } from "drizzle-orm/pg-core";
import { eq, ilike, SQL } from "drizzle-orm/sql";

/**
 * Generates an array of SQL filter conditions based on the provided table schema, model, and filter parameters.
 * It also supports default parameters that can be merged with the input parameters.
 *
 * @template T - The type of the table configuration.
 *
 * @param {PgTableWithColumns<T>} table - The table schema containing columns used for filtering.
 * @param {Record<string, string>} model - A mapping between parameter keys and corresponding table column names.
 * @param {Record<string, any>} params - The filtering parameters where keys represent the field names and values represent the filter criteria.
 * @param {IGenerateSqlFilterFromModelOptions} [options] - Additional options, such as default parameters that will be merged with the input `params`.
 *
 * @returns {SQL<unknown>[]} - An array of SQL conditions that can be used for filtering.
 *
 * @example
 * ```ts
 * const userTable = pgTable(...);
 * const model = { name: 'username', age: 'user_age' };
 * const params = { name: 'John' };
 * const options = { default: { age: 30 } };
 * const filters = generateSqlFilterFromModel(userTable, model, params, options);
 * // Filters will contain SQL conditions like `username ILIKE '%John%'` and `user_age = 30`
 * ```
 */

type IGenerateSqlFilterFromModelOptions = {
  default?: Record<string, any>;
};

export const generateSqlFilterFromModel = <T extends TableConfig>(
  table: PgTableWithColumns<T>,
  model: Record<string, string>,
  params: Record<string, any>,
  options?: IGenerateSqlFilterFromModelOptions,
): SQL<unknown>[] => {
  const { default: defaultParams } = options ?? {}; // Extract default parameters from options if provided

  const allParams = { ...defaultParams, ...params }; // Merge default and input params

  const filters: SQL<unknown>[] = [];
  const paramKeys = Object.keys(allParams); // Get keys from all params
  const modelKeys = Object.values(model); // Get column names from model
  const columns: T["columns"][string][] = [];

  // Map model keys to table columns
  modelKeys.forEach((key) => {
    columns.push(table[key]);
  });

  // Iterate over each param and find matching table column
  paramKeys.forEach((key) => {
    const tableColumn = columns.find((tableCol) => tableCol?.name === key);
    if (!tableColumn) return;

    const paramValue = allParams[key];

    // To fetch all entries regardless of the filter in column
    if (paramValue === "all") return;

    // Apply filters based on the type of paramValue
    switch (typeof paramValue) {
      case "number":
        filters.push(eq(tableColumn, paramValue)); // Equality filter for numbers
        break;
      case "string":
        filters.push(ilike(tableColumn, `%${paramValue}%`)); // ILIKE filter for strings
        break;
      case "boolean":
        filters.push(eq(tableColumn, paramValue)); // Equality filter for booleans
        break;
    }
  });

  return filters; // Return the SQL filters array
};
