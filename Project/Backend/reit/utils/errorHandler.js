// Create error object
exports.createError = (statusCode, message) => {
    const error = new Error(message)
    error.statusCode = statusCode
    return error
  }
  
  