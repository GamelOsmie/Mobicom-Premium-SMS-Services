const { DataTypes } = require('sequelize');
const sequelize = require('../../utils/dbConfig');

const APIKey = sequelize.define(
  'APIKey',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    api_key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = APIKey;
