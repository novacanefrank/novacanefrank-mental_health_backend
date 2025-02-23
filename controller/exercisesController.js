const Exercises = require('../model/ExercisesModel');
const User = require('../model/UserModel');

// Create a new exercise
const createExercise = async (req, res) => {
    try {
        const { title, userId } = req.body;

        // Validate required fields
        if (!title || !userId) {
            return res.status(400).json({ message: "Title and userId are required" });
        }

        // Check if user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newExercise = await Exercises.create({ title, userId });
        res.status(201).json(newExercise);
    } catch (error) {
        console.error("Error creating exercise:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all exercises
const getAllExercises = async (req, res) => {
    try {
        const exercises = await Exercises.findAll({ include: User });
        res.status(200).json(exercises);
    } catch (error) {
        console.error("Error fetching exercises:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get exercise by ID
const getExerciseById = async (req, res) => {
    try {
        const { id } = req.params;
        const exercise = await Exercises.findByPk(id, { include: User });

        if (!exercise) {
            return res.status(404).json({ message: "Exercise not found" });
        }

        res.status(200).json(exercise);
    } catch (error) {
        console.error("Error fetching exercise:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update exercise
const updateExercise = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        const exercise = await Exercises.findByPk(id);
        if (!exercise) {
            return res.status(404).json({ message: "Exercise not found" });
        }

        exercise.title = title || exercise.title;
        await exercise.save();

        res.status(200).json(exercise);
    } catch (error) {
        console.error("Error updating exercise:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete exercise
const deleteExercise = async (req, res) => {
    try {
        const { id } = req.params;

        const exercise = await Exercises.findByPk(id);
        if (!exercise) {
            return res.status(404).json({ message: "Exercise not found" });
        }

        await exercise.destroy();
        res.status(200).json({ message: "Exercise deleted successfully" });
    } catch (error) {
        console.error("Error deleting exercise:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createExercise,
    getAllExercises,
    getExerciseById,
    updateExercise,
    deleteExercise,
};
