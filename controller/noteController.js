const Note = require('../model/NoteModel');
const User = require('../model/UserModel');

// Get all notes
const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.findAll();
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
};

// Get a specific note by ID
const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findByPk(id);

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.status(200).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch note' });
    }
};

// Create a new note
const createNote = async (req, res) => {
    try {
        const { userId, Message, Date } = req.body;

        if (!userId || !Message || !Date) {
            return res.status(400).json({ error: 'User ID, Message, and Date are required' });
        }

        const newNote = await Note.create({ userId, Message, Date });
        res.status(201).json(newNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create note' });
    }
};

// Update a note
const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findByPk(id);

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        await note.update(req.body);
        res.status(200).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update note' });
    }
};

// Delete a note
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findByPk(id);

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        await note.destroy();
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete note' });
    }
};

module.exports = {
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
};
