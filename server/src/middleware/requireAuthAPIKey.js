const APIKey = require('../modules/api-keys/api-keys.model');
const { encryption } = require('../utils/cryptoConfig');
const errorResponse = require('../utils/errorResponse');

const requireAuthAPIKey = async (req, res, next) => {
  const api_token = req.header('x-api-key');

  if (!api_token) {
    return next(
      errorResponse(401, 'Authorization required to perform this action'),
    );
  }

  try {
    const encrypted_key = encryption(api_token);

    const api_key = await APIKey.findOne({ where: { api_key: encrypted_key } });

    if (!api_key) {
      return next(errorResponse(401, 'Invalid API Key'));
    }

    next();
  } catch (err) {
    return errorResponse(401, 'Authorization required to perform this action');
  }
};

module.exports = requireAuthAPIKey;
