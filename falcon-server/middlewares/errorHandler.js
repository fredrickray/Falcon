class HttpError extends Error {
  status;
  success = false;

  constructor(statusCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.status = statusCode;
  }
}

class BadRequest extends HttpError {
  constructor(message) {
    super(400, message);
  }
}

class ResourceNotFound extends HttpError {
  constructor(message) {
    super(404, message);
  }
}

class Unauthorized extends HttpError {
  constructor(message) {
    super(401, message);
  }
}

class Forbidden extends HttpError {
  constructor(message) {
    super(403, message);
  }
}

class Conflict extends HttpError {
  constructor(message) {
    super(409, message);
  }
}

class InvalidInput extends HttpError {
  constructor(message) {
    super(422, message);
  }
}

class ServerError extends HttpError {
  constructor(message) {
    super(500, message);
  }
}

const routeNotFound = (req, res, next) => {
  const message = `Route not found: ${req.originalUrl}`;
  res.status(404).json({ success: false, status: 404, message });
};

const errorHandler = (err, _req, res, _next) => {
  const { success, status, message } = err;
  const cleanedMessage = message.replace(/"/g, '');
  res.status(status).json({
    success,
    status,
    message: cleanedMessage,
  });
};

module.exports = {
  ServerError,
  Conflict,
  Forbidden,
  Unauthorized,
  ResourceNotFound,
  BadRequest,
  InvalidInput,
  HttpError,
  routeNotFound,
  errorHandler,
};
