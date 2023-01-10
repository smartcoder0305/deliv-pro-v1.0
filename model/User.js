const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  company: {
    type: String,
    require: true
  },
  verified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
  }
});

module.exports = mongoose.model('user', UserSchema);
