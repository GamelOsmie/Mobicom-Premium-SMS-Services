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
const subscribers2021Route = require('./modules/subscribers_2021/subscribers.routes');
const subscribers2022Route = require('./modules/subscribers_2022/subscribers.routes');
const subscribers2023Route = require('./modules/subscribers_2023/subscribers.routes');
const subscribers2024Route = require('./modules/subscribers_2024/subscribers.routes');
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

app.use('/api/v1/2021', subscribers2021Route);
app.use('/api/v1/2022', subscribers2022Route);
app.use('/api/v1/2023', subscribers2023Route);
app.use('/api/v1/2024', subscribers2024Route);
app.use('/api/v1', apiKeysRoute);
app.use('/api/v1', analyticsRoute);

//error handler
app.use(errorHandler);

//frontend client catch all route
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
