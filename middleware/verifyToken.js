const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        res.status(401).json({ error: err });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(404).json({ error: "token not found!" });
  }
}

function verifyTokenAndAuthorization(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(401).json({ error: "access denied!" });
    }
  });
}

function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(401).json({ error: "not admin!" });
    }
  });
}

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
