const express = require('express');
const {
  subscribe,
  unsubscribe,
  updateEnoughBalance,
  updateLowBalance,
} = require('./subscribers.controllers');
const requireAuthAPIKey = require('../../middleware/requireAuthAPIKey');
const router = express.Router();

router.post('/subscription', requireAuthAPIKey, subscribe);
router.post('/unsubscription', requireAuthAPIKey, unsubscribe);
router.post('/update-enough-balance', requireAuthAPIKey, updateEnoughBalance);
router.post('/update-low-balance', requireAuthAPIKey, updateLowBalance);

module.exports = router;
