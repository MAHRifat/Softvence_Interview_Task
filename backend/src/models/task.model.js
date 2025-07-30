const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['Arts and Craft', 'Nature', 'Family', 'Sport', 'Friends', 'Meditation'],
      default: 'Nature',
    },
    status: {
      type: String,
      enum: ['pending', 'ongoing', 'collaborative_task', 'done'],
      default: 'pending',
    },
    endDate: {
      type: Date,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('Task', taskSchema);

