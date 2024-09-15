export const toSearchParams = (params?: IApiParams) => {
  const newParams = new URLSearchParams(params);
  return newParams;
};
