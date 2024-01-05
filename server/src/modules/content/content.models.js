const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const ContentSchema = new Schema(
  {
    slug: String,
    author: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      enum: ['2021', '2022', '2023', '2024'],
      required: true,
    },
    subject: {
      type: String,
      required: true,
      unique: true,
       maxLength: 120,
    },
    body: {
      type: String,
      maxLength: 400,
    },
    publication_status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    approval_status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
  },
);

const Content = mongoose.model('Content', ContentSchema);

module.exports = Content;
