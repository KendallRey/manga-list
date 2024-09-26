export const ZOD = {
  ERROR: {
    NOT_EMAIL: "Please enter a valid email address",
    REQUIRED: "This field is required",
    TOO_SHORT: (minLength: number) => `The field must be at least ${minLength} characters long`,
    TOO_LONG: (maxLength: number) => `The field must be no more than ${maxLength} characters long`,
    INVALID_URL: "Please enter a valid URL",
    INVALID_DATE: "Please enter a valid date",
    NOT_NUMBER: "This field must be a number",
    TOO_SMALL: (minValue: number) => `The value must be at least ${minValue}`,
    TOO_LARGE: (maxValue: number) => `The value must be no more than ${maxValue}`,
    INVALID_PATTERN: "The input does not match the required pattern",
    NOT_BOOLEAN: "This field must be true or false",
  },
} as const;
