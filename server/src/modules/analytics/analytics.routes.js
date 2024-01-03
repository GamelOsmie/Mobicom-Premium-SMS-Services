const express = require('express');
const router = express.Router();
const requireAuthAPIKey = require('../../middleware/requireAuthAPIKey');
const {
  createBalanceStatusUpdateRecord,
  createSMSDeliveryRecord,
  dashboardOverview,
} = require('./analytics.controllers');
const requireUserAuth = require('../../middleware/requireUserAuth');

router.post('/records/balance-update', requireAuthAPIKey, createBalanceStatusUpdateRecord);
router.post('/records/sms-delivery', requireAuthAPIKey, createSMSDeliveryRecord);
router.get('/records/dashboard-overview', requireUserAuth, dashboardOverview);

module.exports = router;
