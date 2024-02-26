const express = require('express');
const {
  subscribe,
  unsubscribe,
  updateEnoughBalance,
  updateLowBalance,
  getAllSubscribers,
  getLowBalanceSubscribers,
  getEnoughBalanceSubscribers,
  getSMSTargetGroups,
  searchSubscriber,
} = require('./subscribers.controllers');
const requireAuthAPIKey = require('../../middleware/requireAuthAPIKey');
const requireUserAuth = require('../../middleware/requireUserAuth');
const router = express.Router();

router.post('/subscription', requireAuthAPIKey, subscribe);
router.post('/unsubscription', requireAuthAPIKey, unsubscribe);
router.post('/update-enough-balance', requireAuthAPIKey, updateEnoughBalance);
router.post('/update-low-balance', requireAuthAPIKey, updateLowBalance);

router.get('/subscribers', requireUserAuth, getAllSubscribers);
router.get('/subscribers/low-balance', requireUserAuth, getLowBalanceSubscribers);
router.get('/subscribers/enough-balance', requireUserAuth, getEnoughBalanceSubscribers);
router.get('/subscribers/sms-targets', requireUserAuth, getSMSTargetGroups);

router.post('/subscribers/search', requireUserAuth, searchSubscriber);



module.exports = router;
