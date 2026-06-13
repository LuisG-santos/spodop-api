export const badRequest = (body: Record<string, unknown>) => {
  return {
    statusCode: 400,
    body,
  };
};

export const created = (body: Record<string, unknown>) => {
  return {
    statusCode: 201,
    body,
  };
};

export const serverError = () => {
  return {
    message: "Internal Server Error",
  };
};

export const ok = (body: Record<string, unknown>) => {
  return {
    statusCode: 200,
    body,
  };
};

