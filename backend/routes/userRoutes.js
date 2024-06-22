const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe, updateUser,
  refreshAccessToken, deleteUser, followUser, unfollowUser, getByUsername, getFollowers, 
  getFollowing } = require('../controllers/userController')

const {protect} = require('../middleware/authMiddleware')

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/refresh', refreshAccessToken)
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.put('/update', protect, upload.single('profilePicture'), updateUser)
router.delete('/delete', protect, deleteUser)
router.post('/:id/follow', protect, followUser)
router.post('/:id/unfollow', protect, unfollowUser)
router.get('/username/:username', getByUsername)
router.get('/:userId/followers', protect, getFollowers)
router.get('/:userId/following', protect, getFollowing)

module.exports = router