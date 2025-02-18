const express = require('express');
const router = express.Router();
const setGoalsController = require('../controller/setGoalsController');

router.get('/', setGoalsController.getAllGoals);
router.get('/:id', setGoalsController.getGoalById);
router.post('/', setGoalsController.createGoal);
router.put('/:id', setGoalsController.updateGoal);
router.delete('/:id', setGoalsController.deleteGoal);

module.exports = router;
