const mongoose = require('mongoose');

const VerificationSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('verification', VerificationSchema);
