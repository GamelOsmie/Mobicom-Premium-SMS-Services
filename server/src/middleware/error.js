const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode === 200 ? 500 : err.statusCode).json({
    status: 'error',
    message: err.message || 'Something went wrong',
    data: null,
  });
};

module.exports = errorHandler;
