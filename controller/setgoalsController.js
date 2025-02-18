const SetGoals = require('../model/SetGoalsModel');
const User = require('../model/UserModel');

// Get all goals
const getGoals = async (req, res) => {
    try {
        const goals = await SetGoals.findAll();
        res.status(200).json(goals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch goals' });
    }
};

// Get a specific goal by ID
const getGoalById = async (req, res) => {
    try {
        const { id } = req.params;
        const goal = await SetGoals.findByPk(id);

        if (!goal) {
            return res.status(404).json({ error: 'Goal not found' });
        }

        res.status(200).json(goal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch goal' });
    }
};

// Create a new goal
const createGoal = async (req, res) => {
    try {
        const { userId, Date, Status } = req.body;

        if (!userId || !Date) {
            return res.status(400).json({ error: 'User ID and Date are required' });
        }

        const newGoal = await SetGoals.create({ userId, Date, Status });
        res.status(201).json(newGoal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create goal' });
    }
};

// Update a goal
const updateGoal = async (req, res) => {
    try {
        const { id } = req.params;
        const goal = await SetGoals.findByPk(id);

        if (!goal) {
            return res.status(404).json({ error: 'Goal not found' });
        }

        await goal.update(req.body);
        res.status(200).json(goal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update goal' });
    }
};

// Delete a goal
const deleteGoal = async (req, res) => {
    try {
        const { id } = req.params;
        const goal = await SetGoals.findByPk(id);

        if (!goal) {
            return res.status(404).json({ error: 'Goal not found' });
        }

        await goal.destroy();
        res.status(200).json({ message: 'Goal deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete goal' });
    }
};

module.exports = {
    getGoals,
    getGoalById,
    createGoal,
    updateGoal,
    deleteGoal
};
