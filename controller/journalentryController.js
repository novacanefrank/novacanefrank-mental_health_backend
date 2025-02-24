const JournalEntry = require('../model/JournalEntryModel');
const User = require('../model/UserModel');

// Custom error handler
const handleError = (res, statusCode, message, error = null) => {
    console.error(message);
    if (error) {
        console.error(error.stack);
    }
    return res.status(statusCode).json({ message, error: error ? error.message : null });
};

// Create a new journal entry
const createJournalEntry = async (req, res) => {
    try {
        const { title, entry, userId, Date: journalDate } = req.body;

        // If journalDate is provided, use it, otherwise use the current date
        const createdDate = journalDate ? new Date(journalDate) : new Date();

        // Proceed with saving the entry
        const newEntry = await JournalEntry.create({
            title,
            entry,
            userId,
            Date: createdDate.toISOString(), // Save as ISO string
        });

        return res.status(201).json(newEntry);
    } catch (error) {
        console.error("Error creating journal entry:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



// Get all journal entries
const getAllJournalEntries = async (req, res) => {
    try {
        const journalEntries = await JournalEntry.findAll({
            include: [{
                model: User,
                as: 'User',  // Ensure this matches the alias in the association
            }]
        });

        res.status(200).json(journalEntries);
    } catch (error) {
        console.error("Error in getAllJournalEntries:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// Get a specific journal entry by ID
const getJournalEntryById = async (req, res) => {
    try {
        const { id } = req.params;
        const entry = await JournalEntry.findByPk(id, { include: { model: User, as: 'user' } });

        if (!entry) {
            return handleError(res, 404, "Journal entry not found");
        }

        res.status(200).json({ data: entry });
    } catch (error) {
        handleError(res, 500, "Error in getJournalEntryById", error);
    }
};

// Update a journal entry
const updateJournalEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, entry, Date } = req.body;

        const journalEntry = await JournalEntry.findByPk(id);
        if (!journalEntry) {
            return handleError(res, 404, "Journal entry not found");
        }

        // Only update the fields that are provided
        if (title) journalEntry.title = title;
        if (entry) journalEntry.entry = entry;
        if (Date) {
            if (isNaN(Date.parse(Date))) {
                return handleError(res, 400, "Invalid date format");
            }
            journalEntry.Date = Date;
        }

        await journalEntry.save();
        res.status(200).json({ message: "Journal entry updated successfully", entry: journalEntry });
    } catch (error) {
        handleError(res, 500, "Error in updateJournalEntry", error);
    }
};

// Delete a journal entry
const deleteJournalEntry = async (req, res) => {
    try {
        const { id } = req.params;

        const journalEntry = await JournalEntry.findByPk(id);
        if (!journalEntry) {
            return handleError(res, 404, "Journal entry not found");
        }

        await journalEntry.destroy();
        res.status(200).json({ message: "Journal entry deleted successfully", entry: journalEntry });
    } catch (error) {
        handleError(res, 500, "Error in deleteJournalEntry", error);
    }
};

module.exports = {
    createJournalEntry,
    getAllJournalEntries,
    getJournalEntryById,
    updateJournalEntry,
    deleteJournalEntry,
};
