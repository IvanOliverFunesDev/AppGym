export const successResponse = (res, message, data = {}) => {
  return res.status(200).json({ success: true, message, data });
};

export const errorResponse = (res, statusCode, message, errors = []) => {
  return res.status(statusCode).json({ success: false, message, errors });
};