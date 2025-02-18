const express = require('express');
const router = express.Router();
const moodTrackerController = require('../controller/moodTrackerController');

router.get('/', moodTrackerController.getAllMoodEntries);
router.get('/:id', moodTrackerController.getMoodEntryById);
router.post('/', moodTrackerController.createMoodEntry);
router.put('/:id', moodTrackerController.updateMoodEntry);
router.delete('/:id', moodTrackerController.deleteMoodEntry);

module.exports = router;
