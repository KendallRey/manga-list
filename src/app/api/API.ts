const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

const API = {
  CODE: {
    SUCCESS: {
      OK: 200,
      CREATED: 201,
      ACCEPTED: 202,
      NO_CONTENT: 204,
    },
    ERROR: {
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
      CONFLICT: 409,
      UNPROCESSABLE_ENTITY: 422,
      SERVER_ERROR: 500,
      SERVICE_UNAVAILABLE: 503,
    },
  },
} as const;

export default API;
