const {
  encryption,
  decryption,
  generateAPIKey,
} = require('../../utils/cryptoConfig');
const errorResponse = require('../../utils/errorResponse');
const APIKey = require('./api-keys.model');

const createAPIKey = async (req, res, next) => {
  try {
    const key = generateAPIKey();
    const encrypted_key = encryption(key);

    await APIKey.create({ api_key: encrypted_key });

    return res.status(200).json({
      status: 'success',
      message: 'API Key generated successfully',
      data: key,
    });
  } catch (error) {
    return next(errorResponse(400, error.message));
  }
};

const getAllAPIKeys = async (req, res, next) => {
  try {
    const keys = await APIKey.findAll({});

    let decrypted_keys = [];

    keys.forEach((key) => {
      decrypted_keys.push({
        id: key.id,
        api_key: decryption(key.api_key),
      });
    });

    return res.status(200).json({
      status: 'success',
      message: 'API Key fetched successfully',
      data: decrypted_keys,
    });
  } catch (error) {
    return next(errorResponse(400, error.message));
  }
};

module.exports = {
  createAPIKey,
  getAllAPIKeys,
};
