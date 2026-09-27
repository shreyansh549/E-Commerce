export const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  // only log full stack trace for unexpected (500) errors
  if (statusCode >= 500) {
    console.error(err);
  } else {
    console.warn(`[${statusCode}] ${err.message}`);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
  });
};