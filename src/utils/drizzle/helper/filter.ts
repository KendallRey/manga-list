import { PgTableWithColumns, TableConfig } from "drizzle-orm/pg-core";
import { eq, ilike, SQL } from "drizzle-orm/sql";

/**
 * Generates an array of SQL filter conditions based on the provided table schema, model, and filter parameters.
 * 
 * @template T - The type of the table configuration.
 * 
 * @param {PgTableWithColumns<T>} table - The table schema containing columns used for filtering.
 * @param {Record<string, string>} model - A mapping between parameter keys and corresponding table column names.
 * @param {Record<string, any>} params - The filtering parameters where keys represent the field names and values represent the filter criteria.
 * 
 * @returns {SQL<unknown>[]} - An array of SQL conditions that can be used for filtering.
 * 
 * @example
 * ```ts
 * const userTable = pgTable(...);
 * const model = { name: 'username', age: 'user_age' };
 * const params = { name: 'John', age: 30 };
 * const filters = generateSqlFilterFromModel(userTable, model, params);
 * // Filters will contain SQL conditions like `username ILIKE '%John%'` and `user_age = 30`
 * ```
 */
export const generateSqlFilterFromModel = <T extends TableConfig>(
  table: PgTableWithColumns<T>, 
  model: Record<string, string>, 
  params: Record<string, any>
): SQL<unknown>[] => {

  const filters: SQL<unknown>[] = [];
  const paramKeys = Object.keys(params); // Get keys from params
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

    const paramValue = params[key];
    
    // Apply filters based on the type of paramValue
    switch (typeof paramValue) {
      case 'number':
        filters.push(eq(tableColumn, paramValue)); // Equality filter for numbers
        break;
      case 'string':
        filters.push(ilike(tableColumn, `%${paramValue}%`)); // ILIKE filter for strings
        break;
      case 'boolean':
        filters.push(eq(tableColumn, paramValue)); // Equality filter for booleans
        break;
    }
  });

  return filters; // Return the SQL filters array
};
