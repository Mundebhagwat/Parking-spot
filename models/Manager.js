const mongoose = require('mongoose');

const ManagerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    slots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ParkingSpot' }],
    users: [mongoose.Schema.Types.ObjectId], // Array of active user IDs
    isDeleted: { type: Boolean, default: false } // Soft deletion flag
});

module.exports = mongoose.model('Manager', ManagerSchema);
