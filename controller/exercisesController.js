const Exercises = require('../model/ExercisesModel');
const User = require('../model/UserModel');

// Create a new exercise
const createExercise = async (req, res) => {
    const { userId, description } = req.body;

    if (!userId || !description) {
        return res.status(400).json({ error: 'User ID and Description are required' });
    }

    try {
        // Check if user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newExercise = await Exercises.create({ userId, Description: description });

        res.status(201).json(newExercise);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create exercise' });
    }
};

// Get all exercises
const getExercises = async (req, res) => {
    try {
        const exercises = await Exercises.findAll();
        res.status(200).json(exercises);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch exercises' });
    }
};

// Get a single exercise by ID
const getExerciseById = async (req, res) => {
    try {
        const { id } = req.params;
        const exercise = await Exercises.findByPk(id);

        if (!exercise) {
            return res.status(404).json({ error: 'Exercise not found' });
        }

        res.status(200).json(exercise);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch exercise' });
    }
};

// Update an exercise
const updateExercise = async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;

        const exercise = await Exercises.findByPk(id);
        if (!exercise) {
            return res.status(404).json({ error: 'Exercise not found' });
        }

        await exercise.update({ Description: description });
        res.status(200).json({ message: 'Exercise updated successfully', exercise });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update exercise' });
    }
};

// Delete an exercise
const deleteExercise = async (req, res) => {
    try {
        const { id } = req.params;

        const exercise = await Exercises.findByPk(id);
        if (!exercise) {
            return res.status(404).json({ error: 'Exercise not found' });
        }

        await exercise.destroy();
        res.status(200).json({ message: 'Exercise deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete exercise' });
    }
};

module.exports = { 
    createExercise, 
    getExercises, 
    getExerciseById, 
    updateExercise, 
    deleteExercise 
};

