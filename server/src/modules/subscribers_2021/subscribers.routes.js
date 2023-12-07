const express = require('express');
const {
  subscribe,
  unsubscribe,
  updateEnoughBalance,
  updateLowBalance,
  getAllSubscribers,
  getLowBalanceSubscribers,
  getEnoughBalanceSubscribers,
} = require('./subscribers.controllers');
const requireAuthAPIKey = require('../../middleware/requireAuthAPIKey');
const router = express.Router();

router.post('/subscription', requireAuthAPIKey, subscribe);
router.post('/unsubscription', requireAuthAPIKey, unsubscribe);
router.post('/update-enough-balance', requireAuthAPIKey, updateEnoughBalance);
router.post('/update-low-balance', requireAuthAPIKey, updateLowBalance);

router.get('/subscribers', getAllSubscribers);
router.get('/subscribers/low-balance', getLowBalanceSubscribers);
router.get('/subscribers/enough-balance', getEnoughBalanceSubscribers);

module.exports = router;
