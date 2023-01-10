const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
    delivery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'delivery'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    route: {
        from: {lat: {type: Number}, lng: {type: Number}},
        to: {lat: {type: Number}, lng: {type: Number}}
    },
    weight: {type: Number, required: true},
    size: {
        length: {type: Number},
        width: {type: Number},
        height: {type: Number},
    }
})

module.exports = mongoose.model('offer', OfferSchema);