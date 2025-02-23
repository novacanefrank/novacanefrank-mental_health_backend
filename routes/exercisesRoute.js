const express = require('express');
const router = express.Router();
const exerciseController = require('../controller/exercisesController'); 

// Get all exercises
router.get('/getExercises', exerciseController.getAllExercises);

// Get a specific exercise by ID
router.get('/getExerciseById/:id', exerciseController.getExerciseById);

// Create a new exercise
router.post('/createExercise', exerciseController.createExercise);

// Update an existing exercise
router.put('/updateExercise/:id', exerciseController.updateExercise);

// Delete an exercise
router.delete('/deleteExercise/:id', exerciseController.deleteExercise);

module.exports = router;
