import { PgTableWithColumns, TableConfig } from "drizzle-orm/pg-core";
import { eq, ilike, SQL, asc, desc } from "drizzle-orm/sql";

/**
 * Generates an object containing SQL filter conditions and handles sorting based on the provided table schema, model, and filter parameters.
 * It also supports default parameters that can be merged with the input parameters.
 *
 * @template T - The type of the table configuration.
 *
 * @param {PgTableWithColumns<T>} table - The table schema containing columns used for filtering.
 * @param {Record<string, string>} model - A mapping between parameter keys and corresponding table column names.
 * @param {Record<string, any>} params - The filtering parameters where keys represent the field names and values represent the filter criteria.
 * @param {IGenerateSqlFilterFromModelOptions} [options] - Additional options, such as default parameters that will be merged with the input `params`.
 *
 * @returns {{ filterBys: SQL<unknown>[] }} - An object containing an array of SQL conditions (`filterBys`) that can be used for filtering.
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
 *
 * @example - Sorting Example
 * ```ts
 * const model = { createdAt: 'created_at' };
 * const params = { createdAt: 'desc' };
 * const filters = generateSqlFilterFromModel(userTable, model, params);
 * // Sorting will be handled internally, skipping the `createdAt` in filtering
 * ```
 *
 * - Filtering parameters can include:
 *   - Numbers: Filtered using equality (`=`)
 *   - Strings: Filtered using `ILIKE` for partial matching
 *   - Booleans: Filtered using equality (`=`)
 *   - Sorting Parameters: Skip filtering for sorting columns (`asc` or `desc`)
 */

type IGenerateSqlFilterFromModelOptions = {
  default?: Record<string, any>;
};

export const generateSqlFilterFromModel = <T extends TableConfig>(
  table: PgTableWithColumns<T>,
  model: Record<string, string>,
  params: Record<string, any>,
  options?: IGenerateSqlFilterFromModelOptions,
) => {
  const { default: defaultParams } = options ?? {}; // Extract default parameters from options if provided

  const allParams = { ...defaultParams, ...params }; // Merge default and input params

  const filterBys: SQL<unknown>[] = [];
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

    // This is probably used by Ordering
    if (paramValue === "desc" || paramValue === "asc") {
      return;
    }

    // Apply filters based on the type of paramValue
    switch (typeof paramValue) {
      case "number":
        filterBys.push(eq(tableColumn, paramValue)); // Equality filter for numbers
        break;
      case "string":
        filterBys.push(ilike(tableColumn, `%${paramValue}%`)); // ILIKE filter for strings
        break;
      case "boolean":
        filterBys.push(eq(tableColumn, paramValue)); // Equality filter for booleans
        break;
    }
  });

  return { filterBys };
};

/**
 * Generates an object containing SQL `ORDER BY` conditions and `GROUP BY` columns based on the provided table schema, model, and sorting parameters.
 * It supports default sorting parameters that can be merged with the input parameters.
 *
 * @template T - The type of the table configuration.
 *
 * @param {PgTableWithColumns<T>} table - The table schema containing columns used for sorting.
 * @param {Record<string, string>} model - A mapping between parameter keys and corresponding table column names.
 * @param {Record<string, any>} params - The sorting parameters where keys represent the field names and values represent sorting order (`asc` or `desc`).
 * @param {IGenerateSqlOrderByFromModelOptions} [options] - Additional options, such as default parameters that will be merged with the input `params`.
 *
 * @returns {{ groupByColumns: T["columns"][string][], orderBys: SQL<unknown>[] }} - An object containing:
 * - `groupByColumns`: An array of table columns to be used in the `GROUP BY` clause.
 * - `orderBys`: An array of SQL conditions to be used in the `ORDER BY` clause.
 *
 * @example
 * ```ts
 * const userTable = pgTable(...);
 * const model = { createdAt: 'created_at', updatedAt: 'updated_at' };
 * const params = { createdAt: 'asc', updatedAt: 'desc' };
 * const options = { default: { createdAt: 'desc' } };
 * const { groupByColumns, orderBys } = generateSqlOrderByFromModel(userTable, model, params, options);
 * // The result will contain:
 * // groupByColumns: [userTable['created_at'], userTable['updated_at']]
 * // orderBys: [asc(userTable['created_at']), desc(userTable['updated_at'])]
 * ```
 *
 * @example - Default Sorting
 * ```ts
 * const model = { name: 'username', age: 'user_age' };
 * const params = {}; // No user-provided params
 * const options = { default: { name: 'asc', age: 'desc' } };
 * const { groupByColumns, orderBys } = generateSqlOrderByFromModel(userTable, model, params, options);
 * // The result will contain:
 * // groupByColumns: [userTable['username'], userTable['user_age']]
 * // orderBys: [asc(userTable['username']), desc(userTable['user_age'])]
 * ```
 *
 * @paramBehavior
 * - Sorting parameters can be `asc` for ascending order or `desc` for descending order.
 * - Default parameters will be applied if not overridden by the input `params`.
 *
 * - For each valid parameter key in `params`, the corresponding column will be added to both `GROUP BY` and `ORDER BY` clauses.
 */

type IGenerateSqlOrderByFromModelOptions = {
  default?: Record<string, any>;
};

export const generateSqlOrderByFromModel = <T extends TableConfig>(
  table: PgTableWithColumns<T>,
  model: Record<string, string>,
  params: Record<string, any>,
  options?: IGenerateSqlOrderByFromModelOptions,
) => {
  const { default: defaultParams } = options ?? {}; // Extract default parameters from options if provided

  const allParams = { ...defaultParams, ...params }; // Merge default and input params

  const groupByColumns: T["columns"][string][] = [];
  const orderBys: SQL<unknown>[] = [];
  const paramKeys = Object.keys(allParams); // Get keys from all params
  const modelKeys = Object.values(model); // Get column names from model
  const columns: T["columns"][string][] = [];

  // Map model keys to table columns
  modelKeys.forEach((key) => {
    columns.push(table[key]);
  });

  paramKeys.forEach((key) => {
    const tableColumn = columns.find((tableCol) => tableCol?.name === key);
    if (!tableColumn) return;

    const paramValue = allParams[key];

    switch (paramValue) {
      case "desc":
        orderBys.push(asc(tableColumn));
        groupByColumns.push(tableColumn);
        break;
      case "asc":
        orderBys.push(desc(tableColumn));
        groupByColumns.push(tableColumn);
        break;
    }
  });

  return {
    groupByColumns,
    orderBys,
  };
};

type IGenerateSqlQueriesFromModelOptions = IGenerateSqlOrderByFromModelOptions & IGenerateSqlFilterFromModelOptions;

export const generateSqlQueriesFromModel = <T extends TableConfig>(
  table: PgTableWithColumns<T>,
  model: Record<string, string>,
  params: Record<string, any>,
  options?: IGenerateSqlQueriesFromModelOptions,
) => {
  const sqlTableFilterParams = generateSqlFilterFromModel(table, model, params, options);
  const sqlTableOrderParams = generateSqlOrderByFromModel(table, model, params, options);

  return {
    ...sqlTableOrderParams,
    ...sqlTableFilterParams,
  };
};
