const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token,
    "SECRET_COMES_HERE",
    (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: err,
        });
      }
      req.userId = decoded.id;
      next();
    });
};

const authJwt = {
  verifyToken
};

module.exports = authJwt;
