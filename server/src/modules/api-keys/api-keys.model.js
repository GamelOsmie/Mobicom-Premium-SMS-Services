const mongoose = require('mongoose');
const { Schema } = mongoose;

const APIKeySchema = new Schema(
  {
    api_key: {
      type: String,
      require: false,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  },
);

const APIKey = mongoose.model('APIKey', APIKeySchema);

module.exports = APIKey;
