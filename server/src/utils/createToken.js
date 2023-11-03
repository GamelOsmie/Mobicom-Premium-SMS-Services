const jwt = require('jsonwebtoken');

// token generator
module.exports = createToken = (_id) =>
  jwt.sign({ _id }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });
