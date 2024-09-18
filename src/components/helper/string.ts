/**
 * Trims a string and removes all non-alphanumeric characters, leaving only letters and numbers.
 *
 * @param {string} str - The input string to process.
 * @returns {string} - The processed string containing only alphanumeric characters.
 *
 * @example
 * ```ts
 * const result = cleanString("  Hello, World!123  ");
 * console.log(result); // Output: "HelloWorld123"
 * ```
 */
export const cleanString = (str: string): string => {
  return str.trim().replace(/[^a-zA-Z0-9]/g, "");
};
