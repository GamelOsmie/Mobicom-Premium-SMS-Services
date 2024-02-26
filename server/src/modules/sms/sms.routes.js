const express = require('express');
const requireUserAuth = require('../../middleware/requireUserAuth');
const permission = require('../../middleware/permission');
const sendSMS = require('./sms.controller');
const router = express.Router();

router.post('/blast-sms', requireUserAuth, sendSMS);

module.exports = router;
