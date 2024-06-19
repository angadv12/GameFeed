const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe, updateUser, refreshAccessToken } = require('../controllers/userController')

const {protect} = require('../middleware/authMiddleware')

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/refresh', refreshAccessToken)
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.put('/update', protect, upload.single('profilePicture'), updateUser)

module.exports = router