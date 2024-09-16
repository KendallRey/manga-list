import { MONEY } from "../constants/config";

/**
 * Checks if the provided string is a valid UUID (version 4).
 *
 * A UUID (Universally Unique Identifier) is a 128-bit number used to identify information in computer systems.
 * This function validates the string against the UUID v4 format: `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.
 *
 * @param {string} str - The string to be checked if it is a valid UUID.
 * @returns {boolean} - Returns `true` if the string is a valid UUID, otherwise `false`.
 *
 * @example
 * ```
 * const validUUID = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
 * const invalidUUID = 'invalid-uuid';
 *
 * console.log(isUUID(validUUID)); // true
 * console.log(isUUID(invalidUUID)); // false
 * ```
 */
export const isUUID = (str: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};

/**
 * Format string to Label / Display.
 * @sample first_year -> First Year
 * @sample another_example_string -> Another Example String
 */
export const formatToLabel = (input: string | null | undefined) => {
  if (!input) {
    return "";
  }

  return input
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

/**
 * Format string to ID.
 * @sample Date of Birth -> date_of_birth
 * @sample Pag-ibig -> pag_ibig
 */
export const formatToId = (s: string) => s.replaceAll(" ", "_").replaceAll("-", "_").toLowerCase();

/**
 * Format any array to ID.
 * @sample ("Date of Birth", "sub_link") -> date_of_birth_sub_link
 * @sample ("Pag-ibig", "Setup Manager", "navigation_link") -> pag_ibig_setup_manager_navigation_link
 */
export const transformToId = (...args: any[]) => {
  const names = args.map((name) => formatToId(String(name)));
  return names.join("_");
};

/**
 * Parses a number to a currency string format.
 *
 * @param {number | undefined} value - The value to be formatted as currency.
 * @returns {string} - The formatted currency string.
 */
export const parseToMoney = (value: number | undefined): string => {
  const _value = value || 0;
  return Intl.NumberFormat(MONEY.LOCALE, {
    style: "currency",
    currency: MONEY.CURRENCY,
  }).format(_value);
};

/**
 * Parses a number to a compact currency string format.
 *
 * @param {number | undefined} value - The value to be formatted as compact currency.
 * @returns {string} - The formatted compact currency string.
 */
export const shortParseToMoney = (value: number | undefined): string => {
  const _value = value || 0;
  return Intl.NumberFormat(MONEY.LOCALE, {
    notation: "compact",
    compactDisplay: "short",
  }).format(_value);
};

/**
 * Formats a number to a string with a count format.
 *
 * @param {number | undefined} value - The value to be formatted as a count.
 * @returns {string} - The formatted count string.
 */
export const formatToCount = (value: number | undefined): string => new Intl.NumberFormat(undefined).format(value || 0);
