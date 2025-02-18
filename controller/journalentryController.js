const JournalEntry = require('../model/JournalEntryModel');
const User = require('../model/UserModel');

// Get all journal entries
const getJournalEntries = async (req, res) => {
    try {
        const entries = await JournalEntry.findAll();
        res.status(200).json(entries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch journal entries' });
    }
};

// Get a specific journal entry by ID
const getJournalEntryById = async (req, res) => {
    try {
        const { id } = req.params;
        const entry = await JournalEntry.findByPk(id);

        if (!entry) {
            return res.status(404).json({ error: 'Journal entry not found' });
        }

        res.status(200).json(entry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch journal entry' });
    }
};

// Create a new journal entry
const createJournalEntry = async (req, res) => {
    try {
        const { userId, Date } = req.body;

        if (!userId || !Date) {
            return res.status(400).json({ error: 'User ID and Date are required' });
        }

        const newEntry = await JournalEntry.create({ userId, Date });
        res.status(201).json(newEntry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create journal entry' });
    }
};

// Update a journal entry
const updateJournalEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const entry = await JournalEntry.findByPk(id);

        if (!entry) {
            return res.status(404).json({ error: 'Journal entry not found' });
        }

        await entry.update(req.body);
        res.status(200).json(entry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update journal entry' });
    }
};

// Delete a journal entry
const deleteJournalEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const entry = await JournalEntry.findByPk(id);

        if (!entry) {
            return res.status(404).json({ error: 'Journal entry not found' });
        }

        await entry.destroy();
        res.status(200).json({ message: 'Journal entry deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete journal entry' });
    }
};

module.exports = {
    getJournalEntries,
    getJournalEntryById,
    createJournalEntry,
    updateJournalEntry,
    deleteJournalEntry
};
