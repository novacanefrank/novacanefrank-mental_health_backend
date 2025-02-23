const SetGoals = require('../model/SetGoalsModel');
const User = require('../model/UserModel');

// Create a new goal
const createGoal = async (req, res) => {
    try {
        const { userId, title, Date, isCompleted } = req.body;

        // Validate required fields
        if (!userId || !title || !Date) {
            return res.status(400).json({ message: "UserId, title, and date are required" });
        }

        // Check if user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newGoal = await SetGoals.create({ userId, title, Date, isCompleted });
        res.status(201).json(newGoal);
    } catch (error) {
        console.error("Error creating goal:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all goals
const getAllGoals = async (req, res) => {
    try {
        const goals = await SetGoals.findAll({ include: User });
        res.status(200).json(goals);
    } catch (error) {
        console.error("Error fetching goals:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get a specific goal by ID
const getGoalById = async (req, res) => {
    try {
        const { id } = req.params;
        const goal = await SetGoals.findByPk(id, { include: User });

        if (!goal) {
            return res.status(404).json({ message: "Goal not found" });
        }

        res.status(200).json(goal);
    } catch (error) {
        console.error("Error fetching goal:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update a goal
const updateGoal = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, Date, isCompleted } = req.body;

        const goal = await SetGoals.findByPk(id);
        if (!goal) {
            return res.status(404).json({ message: "Goal not found" });
        }

        goal.title = title || goal.title;
        goal.Date = Date || goal.Date;
        goal.isCompleted = isCompleted !== undefined ? isCompleted : goal.isCompleted;

        await goal.save();
        res.status(200).json(goal);
    } catch (error) {
        console.error("Error updating goal:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete a goal
const deleteGoal = async (req, res) => {
    try {
        const { id } = req.params;

        const goal = await SetGoals.findByPk(id);
        if (!goal) {
            return res.status(404).json({ message: "Goal not found" });
        }

        await goal.destroy();
        res.status(200).json({ message: "Goal deleted successfully" });
    } catch (error) {
        console.error("Error deleting goal:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createGoal,
    getAllGoals,
    getGoalById,
    updateGoal,
    deleteGoal,
};
