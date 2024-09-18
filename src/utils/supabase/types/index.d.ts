type IUploadFileToStorageResponse = IUploadFileToStorageResponseSuccess | IUploadFileToStorageResponseError;

type IUploadFileToStorageResponseSuccess = {
  data: IUploadFileToStorageSuccessResponse;
  error?: null;
};

type IUploadFileToStorageResponseError = {
  data?: null;
  error: IUploadFileToStorageErrorResponse;
};

type IUploadFileToStorageSuccessResponse = {
  id: string;
  path: string;
  fullPath: string;
  publicUrl: string;
};

type IUploadFileToStorageErrorResponse = {
  cause?: unknown;
  message: string;
  name: string;
  stack?: string;
};
