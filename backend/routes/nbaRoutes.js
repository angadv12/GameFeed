const express = require('express')
const router = express.Router()
const { getScores, getGameDetails } = require('../controllers/nbaController')

router.get('/scores', getScores)
router.get('/game-details/:gameId/', getGameDetails)

module.exports = router