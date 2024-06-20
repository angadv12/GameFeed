const express = require('express')
const router = express.Router()
const { getSportsNews } = require('../controllers/newsController')

router.get('/sports-news', getSportsNews)

module.exports = router