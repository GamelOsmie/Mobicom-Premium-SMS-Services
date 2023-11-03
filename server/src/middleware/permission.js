const errorResponse = require("../utils/errorResponse");

const permission = (...roles) => {
  return (req, res, next) => {
    
    if (!roles.includes(req.user.role)) {
      return next(
        errorResponse(
          403,
          "You do not have the authorization to perform this action"
        )
      );
    }

    next();
  };
};

module.exports = permission;
