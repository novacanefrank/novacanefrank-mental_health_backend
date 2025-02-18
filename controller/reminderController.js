const Reminder = require('../model/ReminderModel');
const User = require('../model/UserModel');

// Get all reminders
const getAllReminders = async (req, res) => {
    try {
        const reminders = await Reminder.findAll();
        res.status(200).json(reminders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch reminders' });
    }
};

// Get a specific reminder by ID
const getReminderById = async (req, res) => {
    try {
        const { id } = req.params;
        const reminder = await Reminder.findByPk(id);

        if (!reminder) {
            return res.status(404).json({ error: 'Reminder not found' });
        }

        res.status(200).json(reminder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch reminder' });
    }
};

// Create a new reminder
const createReminder = async (req, res) => {
    try {
        const { userId, Date, Message } = req.body;

        if (!userId || !Date || !Message) {
            return res.status(400).json({ error: 'User ID, Date, and Message are required' });
        }

        const newReminder = await Reminder.create({ userId, Date, Message });
        res.status(201).json(newReminder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create reminder' });
    }
};

// Update a reminder
const updateReminder = async (req, res) => {
    try {
        const { id } = req.params;
        const reminder = await Reminder.findByPk(id);

        if (!reminder) {
            return res.status(404).json({ error: 'Reminder not found' });
        }

        await reminder.update(req.body);
        res.status(200).json(reminder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update reminder' });
    }
};

// Delete a reminder
const deleteReminder = async (req, res) => {
    try {
        const { id } = req.params;
        const reminder = await Reminder.findByPk(id);

        if (!reminder) {
            return res.status(404).json({ error: 'Reminder not found' });
        }

        await reminder.destroy();
        res.status(200).json({ message: 'Reminder deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete reminder' });
    }
};

module.exports = {
    getAllReminders,
    getReminderById,
    createReminder,
    updateReminder,
    deleteReminder
};
