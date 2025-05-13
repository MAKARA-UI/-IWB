function requireDeveloper(req, res, next) {
  if (req.user?.role !== 'developer') {
    return res.status(403).json({ error: 'Access denied' });
  }
  next();
}

function verifyRole(allowedRoles) {
  return (req, res, next) => {
    const user = req.user; // set by auth middleware
    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
}

module.exports = { verifyRole };

