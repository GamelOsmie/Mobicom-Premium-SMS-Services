const express = require('express');
const {
  subscribe,
  unsubscribe,
  updateEnoughBalance,
  updateLowBalance,
} = require('./subscribers.controllers');
const requireAuthAPIKey = require('../../middleware/requireAuthAPIKey');
const router = express.Router();

router.post('/2021/subscription', requireAuthAPIKey, subscribe);
router.post('/2021/unsubscription', requireAuthAPIKey, unsubscribe);
router.post('/2021/update-enough-balance', requireAuthAPIKey, updateEnoughBalance);
router.post('/2021/update-low-balance', requireAuthAPIKey, updateLowBalance);

module.exports = router;
