import mongoose from 'mongoose';

const querySchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  response: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'complete'],
    default: 'pending'
  },
  autoResponded: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model('Query', querySchema);