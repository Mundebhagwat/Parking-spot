const express = require('express');
const { verifyToken } = require('../../middleware/authMiddleware');
const Booking = require('../../models/Booking');

const router = express.Router();

// Create Booking (User Only)
router.post('/', verifyToken, async (req, res) => {
    const { parking_spot_id, booking_date, start_time, end_time, total_cost } = req.body;

    try {
        const user_id = req.user.id;
        const booking = new Booking({ user_id, parking_spot_id, booking_date, start_time, end_time, total_cost });
        await booking.save();
        res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
});

// Get All Bookings for a User
router.get('/my-bookings', verifyToken, async (req, res) => {
    try {
        const bookings = await Booking.find({ user_id: req.user.id }).populate('parking_spot_id');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
});

module.exports = router;
