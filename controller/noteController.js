const Note = require('../model/NoteModel');
const User = require('../model/UserModel');

// Create a new note
const createNote = async (req, res) => {
    try {
        const { userId, Message, Date } = req.body;

        // Validate required fields
        if (!userId || !Message || !Date) {
            console.error("Validation Error: All fields are required");
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user exists
        const user = await User.findByPk(userId);
        if (!user) {
            console.error(`User Not Found: No user found with ID ${userId}`);
            return res.status(404).json({ message: "User not found" });
        }

        const newNote = await Note.create({ userId, Message, Date });
        res.status(201).json(newNote);
    } catch (error) {
        console.error("Error creating note:", error.message, error.stack);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all notes
const getAllNotes = async (req, res) => {
    try {
        const { userId } = req.query; // Get userId from request query parameters
        if (!userId) {
            console.error("User ID is required to fetch notes");
            return res.status(400).json({ message: "User ID is required" });
        }

        const notes = await Note.findAll({ 
            where: { userId },  // Fetch only notes belonging to the logged-in user
            include: User 
        });

        res.status(200).json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error.message, error.stack);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get a specific note by ID
const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findByPk(id, { include: User });

        if (!note) {
            console.error(`Note Not Found: No note found with ID ${id}`);
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json(note);
    } catch (error) {
        console.error("Error fetching note:", error.message, error.stack);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update a note
const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { Message, Date } = req.body;

        const note = await Note.findByPk(id);
        if (!note) {
            console.error(`Note Not Found: No note found with ID ${id}`);
            return res.status(404).json({ message: "Note not found" });
        }

        note.Message = Message || note.Message;
        note.Date = Date || note.Date;

        await note.save();
        res.status(200).json(note);
    } catch (error) {
        console.error("Error updating note:", error.message, error.stack);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete a note
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;

        const note = await Note.findByPk(id);
        if (!note) {
            console.error(`Note Not Found: No note found with ID ${id}`);
            return res.status(404).json({ message: "Note not found" });
        }

        await note.destroy();
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error deleting note:", error.message, error.stack);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote,
};
