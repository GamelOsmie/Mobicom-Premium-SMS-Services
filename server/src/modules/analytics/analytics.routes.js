const express = require('express');
const router = express.Router();
const requireAuthAPIKey = require('../../middleware/requireAuthAPIKey');
const {
  createBalanceStatusUpdateRecord,
  createSMSDeliveryRecord,
  dashboardOverview,
  creatorOverview,
} = require('./analytics.controllers');
const requireUserAuth = require('../../middleware/requireUserAuth');

router.post('/records/balance-update', requireAuthAPIKey, createBalanceStatusUpdateRecord);
router.post('/records/sms-delivery', requireAuthAPIKey, createSMSDeliveryRecord);
router.get('/records/dashboard-overview', requireUserAuth, dashboardOverview);
router.get('/records/content-creator-overview', requireUserAuth, creatorOverview);

module.exports = router;
