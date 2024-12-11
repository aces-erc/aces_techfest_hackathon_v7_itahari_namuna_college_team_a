/**
 * A utility function to send a standardized API response.
 *
 * @param {Object} res - The response object from Express.
 * @param {number} statusCode - The HTTP status code to send.
 * @param {string} message - A message describing the outcome of the request.
 * @param {Object} [data] - Optional data to include in the response.
 */
const statusFunc = (res, statusCode, message, data = null) => {
  const response = { message };
  if (data) response.data = data;
  return res.status(statusCode).json(response);
};

export default statusFunc;
