/**
 * Middleware to handle requests for routes that don't exist.
 * This is a catch-all for 404 Not Found errors.
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Passes the error to the next middleware (our error handler)
};

/**
 * A general error-handling middleware.
 * This catches all errors that occur in the application.
 */
const errorHandler = (err, req, res, next) => {
  // If the status code is 200 (OK), set it to 500 (Internal Server Error) as a default.
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Specific check for Mongoose's "CastError" (e.g., an invalid ObjectId)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  res.status(statusCode).json({
    message: message,
    // Only show the error stack if we are not in production mode for security
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };