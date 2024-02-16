const express = require('express');
const router = express.Router();
const requireAuthAPIKey = require('../../middleware/requireAuthAPIKey');
const {
  createBalanceStatusUpdateRecord,
  dashboardOverview,
  creatorOverview,
  StatOverview2020,
} = require('./analytics.controllers');
const requireUserAuth = require('../../middleware/requireUserAuth');

router.post('/records/balance-update', requireAuthAPIKey, createBalanceStatusUpdateRecord);
router.get('/records/dashboard-overview', requireUserAuth, dashboardOverview);
router.get('/records/content-creator-overview', requireUserAuth, creatorOverview);
router.get('/records/stats-overview/2020', requireUserAuth, StatOverview2020);

module.exports = router;
