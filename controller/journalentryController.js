const JournalEntry = require('../model/JournalEntryModel');
const User = require('../model/UserModel');

// Create a new journal entry
const createJournalEntry = async (req, res) => {
    try {
        const { userId, title, entry, Date } = req.body;

        // Validate required fields
        if (!userId || !title || !entry || !Date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newEntry = await JournalEntry.create({ userId, title, entry, Date });
        res.status(201).json(newEntry);
    } catch (error) {
        console.error("Error creating journal entry:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all journal entries
const getAllJournalEntries = async (req, res) => {
    try {
        const entries = await JournalEntry.findAll({ include: User });
        res.status(200).json(entries);
    } catch (error) {
        console.error("Error fetching journal entries:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get a specific journal entry by ID
const getJournalEntryById = async (req, res) => {
    try {
        const { id } = req.params;
        const entry = await JournalEntry.findByPk(id, { include: User });

        if (!entry) {
            return res.status(404).json({ message: "Journal entry not found" });
        }

        res.status(200).json(entry);
    } catch (error) {
        console.error("Error fetching journal entry:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update a journal entry
const updateJournalEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, entry, Date } = req.body;

        const journalEntry = await JournalEntry.findByPk(id);
        if (!journalEntry) {
            return res.status(404).json({ message: "Journal entry not found" });
        }

        journalEntry.title = title || journalEntry.title;
        journalEntry.entry = entry || journalEntry.entry;
        journalEntry.Date = Date || journalEntry.Date;

        await journalEntry.save();
        res.status(200).json(journalEntry);
    } catch (error) {
        console.error("Error updating journal entry:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete a journal entry
const deleteJournalEntry = async (req, res) => {
    try {
        const { id } = req.params;

        const journalEntry = await JournalEntry.findByPk(id);
        if (!journalEntry) {
            return res.status(404).json({ message: "Journal entry not found" });
        }

        await journalEntry.destroy();
        res.status(200).json({ message: "Journal entry deleted successfully" });
    } catch (error) {
        console.error("Error deleting journal entry:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createJournalEntry,
    getAllJournalEntries,
    getJournalEntryById,
    updateJournalEntry,
    deleteJournalEntry,
};
