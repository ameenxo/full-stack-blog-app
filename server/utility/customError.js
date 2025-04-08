class CustomError extends Error {
    constructor(message, statusCode, errorCode) {
      super(message);
      this.statusCode = statusCode || 402;
      this.errorCode = errorCode || "BAD_REQUEST";
    }
  }
  
  module.exports = CustomError;
  