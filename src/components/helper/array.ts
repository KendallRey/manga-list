/**
 * Returns array of ID.
 * @param {Array<string>} list List of Data with `id`.
 * @returns {Array<string>} An array of IDs.
 */
export const toIdsOfDataArray = <T extends IWithID>(list: T[]): Array<ID> => {
  return list.map((item) => item.id);
};

/**
 * Returns an array of objects by subtracting the array `toClear` from the array `list`.
 * @param  {Array<IWithID>} list - The original list of objects with `id` properties.
 * @param  {Array<IWithID>} toClear - The list of objects with `id` properties to be subtracted from the original list.
 * @returns {Array<IWithID>} An array of objects.
 */
export const clearDataArrayOf = <T extends IWithID>(list: T[], toClear: T[]): Array<IWithID> => {
  const ids = toIdsOfDataArray(toClear);
  return list.filter((item) => !ids.includes(item.id));
};

/**
 * Returns an array of objects by array of IDs.
 * @param  {Array<IWithID>} list - The original list of objects with `id` properties.
 * @param  {Array<IWithID>} ids - The list of `id` to be selected from the original list.
 * @returns {Array<IWithID>} An array of objects.
 */
export const selectDataArrayOfByIDs = <T extends IWithID>(list: T[] | undefined, ids: ID[]): Array<T> => {
  if (!list) return [];
  return list.filter((item) => ids.includes(item.id));
};

/**
 * Extracts the values of a specific field from an array of objects.
 * @param list - Array of objects.
 * @param field - The key of the field to extract values from.
 * @returns An array of values corresponding to the specified field.
 */
export const extractFieldValues = <T extends Record<string, any>, K extends keyof T>(
  list: T[] | undefined,
  field: K,
): T[K][] => {
  if (!list) return [];
  return list.map((item) => item[field]);
};
