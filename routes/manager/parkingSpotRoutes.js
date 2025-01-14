const express = require('express');
const { verifyToken, isManager } = require('../../middleware/authMiddleware');
const ParkingSpot = require('../../models/ParkingSpot');
const Manager = require('../../models/Manager');

const router = express.Router();

// Add Parking Spot (Manager Only)
router.post('/', verifyToken, isManager, async (req, res) => {
    const { name, location, hourly_rate } = req.body;

    try {
        const manager_id = req.user.id;
        const parkingSpot = new ParkingSpot({ name, location, hourly_rate, manager_id });
        console.log(parkingSpot);
        await parkingSpot.save();

        // push to manager spot array
        await Manager.findByIdAndUpdate(manager_id, {
            $push: { slots: parkingSpot._id },
        });

        res.status(201).json({ message: 'Parking spot added successfully', parkingSpot });
    } catch (error) {
        res.status(500).json({ message: 'Error adding parking spot', error: error.message });
    }
});

// Get Parking Spots Managed by the Manager
router.get('/my-spots', verifyToken, isManager, async (req, res) => {
    try {
        const managerId = req.user.id;
        const parkingSpots = await ParkingSpot.find({ manager_id: managerId });

        if (!parkingSpots.length) {
            return res.status(404).json({ message: 'No parking spots found for this manager.' });
        }

        res.json(parkingSpots);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching parking spots.', error: error.message });
    }
});

module.exports = router;
