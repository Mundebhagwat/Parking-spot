const express = require('express');
const { verifyToken, isManager } = require('../../middleware/authMiddleware');
const Booking = require('../../models/Booking');
const ParkingSpot = require('../../models/ParkingSpot');

const router = express.Router();

// Get All Bookings for Spots Managed by the Manager
router.get('/', verifyToken, isManager, async (req, res) => {
    try {
        const managerId = req.user.id;

        // Fetch parking spots managed by the manager
        const parkingSpots = await ParkingSpot.find({ manager_id: managerId });
        const parkingSpotIds = parkingSpots.map(spot => spot._id);

        // Fetch bookings for the manager's parking spots
        const bookings = await Booking.find({ parking_spot_id: { $in: parkingSpotIds } }).populate('parking_spot_id');

        if (!bookings.length) {
            return res.status(404).json({ message: 'No bookings found for your parking spots.' });
        }

        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings.', error: error.message });
    }
});

module.exports = router;
