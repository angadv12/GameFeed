const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500
  //use the status code from the response, if available, otherwise use 500

  res.status(statusCode)

  res.json({
      message: err.message,
      stack: process.env.BUILD === 'production' ? null : err.stack
      //If in production, don't show the stack trace
  })
}

module.exports = {
  errorHandler
}