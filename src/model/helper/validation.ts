import { SafeParseError } from "zod";

export const getValidationErrors = <T>(result: SafeParseError<T>) => {
  const newErrors: Partial<Record<string, string>> = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      issue.path.forEach((path) => (newErrors[path] = issue.message));
    });
  }
  return newErrors;
};
