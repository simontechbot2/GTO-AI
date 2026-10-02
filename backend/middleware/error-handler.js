function errorHandler(
  error,
  _req,
  res,
  _next
) {

  console.error(error);

  if (res.headersSent) {
    return;
  }

  res
    .status(
      error.status || 500
    )
    .json({
      error:
        error.message ||
        "Internal server error."
    });
}

module.exports =
  errorHandler;
