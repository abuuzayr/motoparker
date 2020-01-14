const mongoose = require('mongoose');

const LocationSchema = mongoose.Schema({
    name: String,
    directions: String,
    charges: String,
    ura: Boolean,
    hdb: Boolean,
    free: Boolean,
    lat: Number,
    lng: Number,
    active: { type: Boolean, default: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Location', LocationSchema);