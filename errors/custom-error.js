class CustomAPIError extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statuscode = statuscode;
  }
}

const createCustomError = (message, statuscode) => {
  return new CustomAPIError(message, statuscode);
};

module.exports = { createCustomError, CustomAPIError };
