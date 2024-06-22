const Comment = require('../models/Comment');

const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ gameId: req.params.gameId }).populate('userId', 'username profilePicture');
        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error.message, error.stack); // Log detailed error
        res.status(500).json({ error: 'Error fetching comments', details: error.message });
    }
};

const createComment = async (req, res) => {
    try {
        const { gameId, text } = req.body;
        const userId = req.user.id;

        if (!gameId) {
          return res.status(400).json({ error: 'gameId is required' });
        }

        const newComment = new Comment({ gameId, userId, text });
        await newComment.save();

        const populatedComment = await newComment.populate('userId', 'username profilePicture')

        res.status(201).json(populatedComment);
    } catch (error) {
        console.error('Error creating comment:', error.message, error.stack); // Log detailed error
        res.status(500).json({ error: 'Error creating comment', details: error.message });
    }
};

module.exports = { getComments, createComment };
