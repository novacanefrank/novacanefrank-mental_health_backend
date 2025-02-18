const ReviewProgress = require('../model/ReviewProgressModel');
const User = require('../model/UserModel');

// Get all progress reviews
const getAllReviews = async (req, res) => {
    try {
        const reviews = await ReviewProgress.findAll();
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch progress reviews' });
    }
};

// Get a specific progress review by ID
const getReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await ReviewProgress.findByPk(id);

        if (!review) {
            return res.status(404).json({ error: 'Progress review not found' });
        }

        res.status(200).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch progress review' });
    }
};

// Create a new progress review
const createReview = async (req, res) => {
    try {
        const { userId, Date, Message } = req.body;

        if (!userId || !Date || !Message) {
            return res.status(400).json({ error: 'User ID, Date, and Message are required' });
        }

        const newReview = await ReviewProgress.create({ userId, Date, Message });
        res.status(201).json(newReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create progress review' });
    }
};

// Update a progress review
const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await ReviewProgress.findByPk(id);

        if (!review) {
            return res.status(404).json({ error: 'Progress review not found' });
        }

        await review.update(req.body);
        res.status(200).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update progress review' });
    }
};

// Delete a progress review
const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await ReviewProgress.findByPk(id);

        if (!review) {
            return res.status(404).json({ error: 'Progress review not found' });
        }

        await review.destroy();
        res.status(200).json({ message: 'Progress review deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete progress review' });
    }
};

module.exports = {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
};
