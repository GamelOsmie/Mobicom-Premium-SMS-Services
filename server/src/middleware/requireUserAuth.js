const jwt = require('jsonwebtoken');
const User = require('../modules/users/users.models');
const errorResponse = require('../utils/errorResponse');

const requireUserAuth = async (req, res, next) => {
  //using cookies for auth
  const { token } = req.cookies;

  if (!token) {
    return next(
      errorResponse(401, 'Authorization required to perform this action'),
    );
  }

  try {
    //verify the token and grab the id from the token
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    //get the user that made the request and save it as part of the request
    req.user = await User.findOne(
      {
        where: { id },
      },
      { attributes: ['id', 'role', 'is_active'] },
    );

    if (req.user.is_active === false) {
      res.cookie('token', '', { maxAge: 1000 });
      return next(errorResponse(401, 'Your account has been suspended'));
    }

    next();
  } catch (err) {
    return errorResponse(401, 'Authorization required to perform this action');
  }
};

module.exports = requireUserAuth;
