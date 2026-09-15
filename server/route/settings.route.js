const express = require('express');
const router = express.Router();
const Settings = require('../module/settings.model');

// Get a setting by key
router.get('/:key', async (req, res) => {
    try {
        const setting = await Settings.findOne({ key: req.params.key });
        if (!setting) {
            return res.status(404).json({ message: 'Setting not found' });
        }
        res.json(setting);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update or create a setting
router.post('/:key', async (req, res) => {
    try {
        const { value } = req.body;
        let setting = await Settings.findOne({ key: req.params.key });
        
        if (setting) {
            setting.value = value;
            await setting.save();
        } else {
            setting = new Settings({ key: req.params.key, value });
            await setting.save();
        }
        
        res.json(setting);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
