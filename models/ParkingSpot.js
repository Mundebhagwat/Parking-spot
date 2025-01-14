const mongoose = require('mongoose');

const ParkingSpotSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    hourly_rate: { type: Number, required: true },
    manager_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' },
    isDeleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('ParkingSpot', ParkingSpotSchema);
