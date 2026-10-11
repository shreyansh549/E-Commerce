export const throwError = (
  errorMessage = "Internal server error",
  errorCode = 500,
) => {
  const error = new Error(errorMessage);
  error.statusCode = errorCode;

  throw error;
};