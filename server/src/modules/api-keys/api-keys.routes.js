const express = require('express');
const { createAPIKey, getAllAPIKeys } = require('./api-keys.controllers');

const router = express.Router();

router.get('/create-api-keys', createAPIKey);
router.get('/api-keys', getAllAPIKeys);

module.exports = router;
