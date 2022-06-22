import AppError from '../utils/appError.js';

const handleErrorDB = (err) => {
  const { parent: message } = err;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const [duplicateField] = err.errors;
  const message = `Duplicate field value: ${duplicateField.value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errorsArr = err.errors.map((el) => el.message);
  const message = `Invalid input data: ${errorsArr.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted err: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming  or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error('ERROR 💥', err);

    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

const errorController = (err, req, res, next) => {
  //console.log(err.stack);
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (error.name === 'SequelizeDatabaseError') error = handleErrorDB(error);
    if (error.name === 'SequelizeUniqueConstraintError')
      error = handleDuplicateFieldsDB(error);
    if (error.name === 'SequelizeValidationError')
      error = handleValidationErrorDB(error);

    sendErrorProd(error, res);
  }
};
export default errorController;
