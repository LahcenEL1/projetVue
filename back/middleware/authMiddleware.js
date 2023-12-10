const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Accès refusé, le token est manquant' });
  }

  const token = authHeader.split(' ')[1]; // Assurez-vous de correctement extraire le token

  if (!token) {
    return res.status(401).json({ message: 'Accès refusé, le token est invalide' });
  }

  try {
    const verified = jwt.verify(token, 'votre_clé_secrète');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token invalide' });
  }
};

module.exports = authMiddleware;
