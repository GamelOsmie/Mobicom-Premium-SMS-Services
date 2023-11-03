const express = require('express');
const router = express.Router();
const requireAuthAPIKey = require('../../middleware/requireAuthAPIKey');
const {
  createBalanceStatusUpdateRecord,
  createSMSDeliveryRecord,
} = require('./analytics.controllers');

router.post('/records/balance-update', requireAuthAPIKey, createBalanceStatusUpdateRecord);
router.post('/records/sms-delivery', requireAuthAPIKey, createSMSDeliveryRecord);

module.exports = router;
