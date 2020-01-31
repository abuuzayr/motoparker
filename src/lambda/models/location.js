const mongoose = require('mongoose');

const LocationSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    directions: { type: String },
    charges: { type: String },
    ura: { type: Boolean, default: false },
    hdb: { type: Boolean, default: false },
    free: { type: Boolean, default: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    active: { type: Boolean, default: true }
}, {
    timestamps: true
});

const Location = mongoose.model('Location', LocationSchema);

export default Location