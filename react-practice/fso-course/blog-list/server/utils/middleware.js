const logger = require("./logger");
const jwt = require("jsonwebtoken");

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err.name === "ValidationError") {
    return res.status(400).send({ error: "Username or password is invalid" });
  } else if (err.name === "JsonWebTokenError") {
    return res.status(400).json({ error: err.message });
  } else if (err.name === "CastError") {
    return res.status(400).json({ error: "Not a valid id" });
  }

  next(err);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "");
  } else {
    req.token = null;
  }

  next();
};

const userExtractor = (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "invalid token" });
  }
  req.user = decodedToken;
  next();
};

module.exports = { errorHandler, tokenExtractor, userExtractor };
