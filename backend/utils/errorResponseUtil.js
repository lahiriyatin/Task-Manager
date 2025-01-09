export const sendErrorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({
    success: false,
    message
  });
};
