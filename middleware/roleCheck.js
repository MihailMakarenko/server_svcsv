const roleCheck = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.Role)) {
      return res.status(403).json({ message: "У вас нет к этому доступа" });
    }

    next();
  };
};

module.exports = roleCheck;
