const jwt = require('jsonwebtoken');


const adminMiddleware = (req, res, next) => {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Accès refusé, nécessite des privilèges d'administrateur" });
    }
    next();
  };
module.exports = adminMiddleware;
