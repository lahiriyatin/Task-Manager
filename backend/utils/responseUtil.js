export const sendSuccessResponse = (res, data) => {
  res.status(200).json({
    success: true,
    data
  });
};