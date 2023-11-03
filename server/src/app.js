const express = require('express');
const path = require('path');
require('dotenv').config();
require('helmet');
const cors = require('cors');
const { default: helmet } = require('helmet');
const cookieParser = require('cookie-parser');

// error handler import
const errorHandler = require('./middleware/error');

// routes import
const subscribersRoute = require('./modules/subscribers/subscribers.routes');
const apiKeysRoute = require('./modules/api-keys/api-keys.routes');
const analyticsRoute = require('./modules/analytics/analytics.routes');

// init express
const app = express();

// system middlewares
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(cookieParser());
app.use(helmet()),
  app.use((req, res, next) => {
    console.log(req.method, req.path, res.statusCode);

    next();
  });

app.use('/api/v1', subscribersRoute);
app.use('/api/v1', apiKeysRoute);
app.use('/api/v1', analyticsRoute);

//error handler
app.use(errorHandler);

//frontend client catch all route
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
