//accepts a zod validation schema
export const validate = (schema) => {
  return (req, res, next) => {
    // pass through req.body to schema parse method
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result?.error?.issues[0]?.message || "validation failed",
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    req.body = result.data;

    next();
  };
};
