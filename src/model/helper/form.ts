export const formDataToObject = (formData: FormData) => {
  const formObject: { [key: string]: any } = {};

  formData.forEach((value, key) => {
    formObject[key] = value;
  });
  return formObject;
};
