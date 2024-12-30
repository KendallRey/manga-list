/**
 * Converts a FormData instance into a plain JavaScript object.
 *
 * @param formData - The FormData instance to convert.
 * @returns An object containing the key-value pairs from the FormData.
 *
 * @example
 * const formData = new FormData();
 * formData.append("name", "John");
 * formData.append("age", "30");
 *
 * const result = formDataToObject(formData);
 * console.log(result); // { name: "John", age: "30" }
 */
export const formDataToObject = (formData: FormData): Record<string, any> => {
  const formObject: Record<string, any> = {};

  formData.forEach((value, key) => {
    // Handle multiple values for the same key
    if (formObject[key] !== undefined) {
      // Convert single value to an array if a duplicate key is found
      formObject[key] = Array.isArray(formObject[key]) ? [...formObject[key], value] : [formObject[key], value];
    } else {
      formObject[key] = value;
    }
  });

  return formObject;
};

/**
 * Converts an object into a FormData instance.
 *
 * @template T - A generic type extending an object with string keys and any values.
 * @param form - The object to convert to FormData.
 * @returns A FormData instance containing the object's key-value pairs.
 *
 * @example
 * const formData = toFormData({ name: "John", age: 30 });
 * console.log(formData.get("name")); // "John"
 * console.log(formData.get("age"));  // "30"
 */
export const toFormData = <T extends Record<string, any>>(form: T): FormData => {
  const formData = new FormData();

  Object.entries(form).forEach(([key, value]) => {
    // Handle special cases like arrays or objects
    if (Array.isArray(value)) {
      value.forEach((item, index) => formData.append(`${key}[${index}]`, item));
    } else if (typeof value === "object" && value !== null) {
      formData.append(key, JSON.stringify(value)); // Serialize objects to JSON strings
    } else {
      formData.append(key, String(value)); // Convert primitive values to strings
    }
  });

  return formData;
};
