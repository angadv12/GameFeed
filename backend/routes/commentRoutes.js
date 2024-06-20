const express = require('express');
const { getComments, createComment } = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:gameId/comments', getComments);
router.post('/:gameId/comments', protect, createComment);

module.exports = router;
