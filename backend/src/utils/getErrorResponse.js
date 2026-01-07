export const getErrorResponse = (status, name, message) => {
  const response = {
    status: status,
    name: name,
    message: message
  }
  return response;
};
export default getErrorResponse;