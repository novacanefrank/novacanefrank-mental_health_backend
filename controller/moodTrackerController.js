const MoodTracker = require('../model/MoodTrackerModel');
const User = require('../model/UserModel');

// Get all mood tracker entries
const getMoodEntries = async (req, res) => {
    try {
        const entries = await MoodTracker.findAll();
        res.status(200).json(entries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch mood tracker entries' });
    }
};

// Get a specific mood tracker entry by ID
const getMoodEntryById = async (req, res) => {
    try {
        const { id } = req.params;
        const entry = await MoodTracker.findByPk(id);

        if (!entry) {
            return res.status(404).json({ error: 'Mood entry not found' });
        }

        res.status(200).json(entry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch mood tracker entry' });
    }
};

// Create a new mood tracker entry
const createMoodEntry = async (req, res) => {
    try {
        const { userId, Date } = req.body;

        if (!userId || !Date) {
            return res.status(400).json({ error: 'User ID and Date are required' });
        }

        const newEntry = await MoodTracker.create({ userId, Date });
        res.status(201).json(newEntry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create mood tracker entry' });
    }
};

// Update a mood tracker entry
const updateMoodEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const entry = await MoodTracker.findByPk(id);

        if (!entry) {
            return res.status(404).json({ error: 'Mood entry not found' });
        }

        await entry.update(req.body);
        res.status(200).json(entry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update mood tracker entry' });
    }
};

// Delete a mood tracker entry
const deleteMoodEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const entry = await MoodTracker.findByPk(id);

        if (!entry) {
            return res.status(404).json({ error: 'Mood entry not found' });
        }

        await entry.destroy();
        res.status(200).json({ message: 'Mood entry deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete mood tracker entry' });
    }
};

module.exports = {
    getMoodEntries,
    getMoodEntryById,
    createMoodEntry,
    updateMoodEntry,
    deleteMoodEntry
};
