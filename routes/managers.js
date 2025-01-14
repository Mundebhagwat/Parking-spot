const express = require('express');
const bcrypt = require('bcryptjs');
const Manager = require('../models/Manager');

const router = express.Router();

// Register Manager
router.post('/register', async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const manager = new Manager({ name, email, phone, password: hashedPassword });

        await manager.save();
        res.status(201).json({ message: 'Manager registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering manager', error: error.message });
    }
});

// Get All Managers
router.get('/', async (req, res) => {
    try {
        const mangers = await Manager.find();
        res.json(mangers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching managers', error: error.message });
    }
});


module.exports = router;
