const express = require('express');
const router = express.Router();
const exercisesController = require('../controller/exercisesController');

// Get all exercises
router.get('/', exercisesController.getAllExercises);

// Get a specific exercise by ID
router.get('/:id', exercisesController.getExerciseById);

// Create a new exercise
router.post('/', exercisesController.createExercise);

// Update an existing exercise
router.put('/:id', exercisesController.updateExercise);

// Delete an exercise
router.delete('/:id', exercisesController.deleteExercise);

module.exports = router;

