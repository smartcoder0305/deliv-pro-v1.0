const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
    },
    route: [{
        index: {type: Number},
        lat: {type: Number},
        lng: {type: Number},
        address: {type: String}
    }],
    contact: {
        type: String,
    },
    phone: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    vehi_type: {
        type: [String],
        required: true,
    },
    vehi_reg: {
        type: String,
    },
    trip_name: {
        type: String,
    }
});

module.exports = mongoose.model('delivery', DeliverySchema);