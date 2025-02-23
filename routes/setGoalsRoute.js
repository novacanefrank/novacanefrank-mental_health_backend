const express = require('express');
const router = express.Router();
const setGoalsController = require('../controller/setGoalsController');

router.get('/getAllGoals', setGoalsController.getAllGoals);
router.get('/getAllGoals/:id', setGoalsController.getGoalById);
router.post('/createGoal', setGoalsController.createGoal);
router.put('/updateGoal/:id', setGoalsController.updateGoal);
router.delete('/deleteGoal/:id', setGoalsController.deleteGoal);

module.exports = router;
