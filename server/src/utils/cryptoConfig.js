const crypto = require('crypto');

// Encryption using the 'crypto' module
const encryption = (text) => {
  const cipher = crypto.createCipher('aes-256-cbc', process.env.JWT_SECRET); // Using AES-256-CBC algorithm
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

// Decryption using the 'crypto' module
const decryption = (encryptedText) => {
  const decipher = crypto.createDecipher('aes-256-cbc', process.env.JWT_SECRET);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

const generateAPIKey = () => {
  return crypto.randomBytes(16).toString('hex');
};

module.exports = {
  encryption,
  decryption,
  generateAPIKey,
};
