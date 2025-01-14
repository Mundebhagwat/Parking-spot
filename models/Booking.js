
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    parking_spot_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ParkingSpot', required: true },
    booking_date: { type: Date, required: true },
    start_time: { type: String, required: true },
    end_time: { type: String, required: true },
    total_cost: { type: Number, required: true },
});

module.exports = mongoose.model('Booking', BookingSchema);
