const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const Comment = require('../models/Comment')
const placeholder = `http://localhost:${process.env.PORT}/assets/pfpPlaceholder.png`
const fs = require('fs')
const path = require('path')
const { saveProfilePicture } = require('../utils/fileUtils')

// @desc  generate json webtoken
const genJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '15m' // token expires in 15 minutes
  });
};

// Generate refresh token
const genRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_SECRET, {
    expiresIn: '7d' // refresh token expires in 7 days
  });
};

// @desc  register User
// @route POST /api/user
// @access Public
const registerUser = async (req, res) => {
  const { name, username, email, password } = req.body

  if( !name || !username || !email || !password ) {
    res.status(400) //400: bad request
    throw new Error('Please enter all fields')
  }
  const userExists = await User.findOne({email}) //checks database for user exists (email in db)
  if(userExists) {
    res.status(400) //400: bad request
    throw new Error('User already exists')
  }

  //salt and hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPass = await bcrypt.hash(password, salt)

  const user = await User.create({
    name,
    username,
    email,
    password: hashedPass,
    profilePicture: placeholder,
    followers: [],
    following: []
  })
  if(user) {
    const token = genJWT(user._id);
    const refreshToken = genRefreshToken(user._id);
    
    // Store refresh token in HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict'
    });

    res.status(201).json({ //201: OK and resource created
        _id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        token,
        profilePicture: user.profilePicture,
        following: user.following,
        followers: user.followers
    })
} else {
    res.status(400) //Error: bad request
    throw new Error('Invalid user data')
}
}

// @desc login a User
// @route POST /api/user/login
// @access Public
const loginUser = asyncHandler( async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({email})
  if(user && (await bcrypt.compare(password, user.password))) {
    const token = genJWT(user._id);
    const refreshToken = genRefreshToken(user._id);

    // Store refresh token in HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict'
    });

    res.status(200).json({ //200: OK
      _id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      token: token,
      profilePicture: user.profilePicture,
      following: user.following,
      followers: user.followers
    })
  } else {
    res.status(400) //400: bad request
    throw new Error('Invalid email or password')
  }
  
})

// @desc Update user profile
// @route PUT /api/user/update
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const { name, username, email, password } = req.body

  const updates = {};

  if (name) updates.name = name
  if (username) updates.username = username
  if (email) updates.email = email
  if (password) {
    const salt = await bcrypt.genSalt(10)
    updates.password = await bcrypt.hash(password, salt)
  }

  const user = await User.findById(userId)

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (req.file) {
    if(user.profilePicture && user.profilePicture !== placeholder) {
      const oldFilePath = path.join(__dirname, '../public/assets', path.basename(user.profilePicture))
      fs.unlink(oldFilePath, (err) => {
        if (err) console.error('Failed to delete old profile picture:', err);
      })
    }
    updates.profilePicture = await saveProfilePicture(req.file);
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

  if (updatedUser) {
    res.json({
      _id: updatedUser.id,
      username: updatedUser.username,
      name: updatedUser.name,
      email: updatedUser.email,
      profilePicture: updatedUser.profilePicture,
    });
  } else {
    res.status(400);
    throw new Error('Failed to update profile');
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const user = await User.findById(userId)

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }


// Delete user's profile picture if it's not the placeholder
  if (user.profilePicture && user.profilePicture !== placeholder) {
    const oldFilePath = path.join(__dirname, '../public/assets', path.basename(user.profilePicture))
    fs.unlink(oldFilePath, (err) => {
        if (err) console.error('Failed to delete old profile picture:', err)
    })
  }

  // Delete the user
  await User.deleteOne({ _id: userId });

  // Delete associated comments
  await Comment.deleteMany({ userId: userId });

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.BUILD === 'production',
    sameSite: 'Strict'
  });

  res.status(200).json({ message: 'User deleted successfully' });

});

// @desc  get user data
// @route GET /api/user/me
// @access Private
const getMe = asyncHandler( async (req, res) => {
  const { _id, name, username, email, profilePicture, followers, following } = await User.findById(req.user.id)

  res.status(200).json({
      id: _id,
      name,
      username,
      email,
      profilePicture,
      followers,
      following,
  })
})

const getByUsername = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username })
  try {
    if (user) {
      // Remove sensitive information like password before sending
      const { password, ...userWithoutPassword } = user.toObject()
      res.json(userWithoutPassword);
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

const getFollowers = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId)
  try {
    await user.populate('followers', 'name username');
    res.json(user.followers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching followers', error: error.message });
  }
})

const getFollowing = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId)
  try {
    await user.populate('following', 'name username');
    res.json(user.following);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching following', error: error.message });
  }
})

const refreshAccessToken = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token not found' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const newAccessToken = genJWT(user._id)
    res.setHeader('Authorization', `Bearer ${newAccessToken}`);
    res.user = user
    next()
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({ message: 'Invalid refresh token' });
  }
});

// @desc Follow a user
// @route POST /api/user/:id/follow
// @access Private
const followUser = asyncHandler(async (req, res) => {
  const userToFollow = await User.findById(req.params.id);
  const currentUser = await User.findById(req.user.id);

  if (!userToFollow) {
      res.status(404);
      throw new Error('User not found');
  }

  if (userToFollow.followers.includes(currentUser.id)) {
      res.status(400);
      throw new Error('You already follow this user');
  }

  await User.findByIdAndUpdate(userToFollow.id, {
      $push: { followers: currentUser.id }
  });

  await User.findByIdAndUpdate(currentUser.id, {
      $push: { following: userToFollow.id }
  });

  res.status(200).json({ message: `You are now following ${userToFollow.username}` });
});

// @desc Unfollow a user
// @route POST /api/user/:id/unfollow
// @access Private
const unfollowUser = asyncHandler(async (req, res) => {
  const userToUnfollow = await User.findById(req.params.id);
  const currentUser = await User.findById(req.user.id);

  if (!userToUnfollow) {
      res.status(404);
      throw new Error('User not found');
  }

  if (!userToUnfollow.followers.includes(currentUser.id)) {
      res.status(400);
      throw new Error('You do not follow this user');
  }

  await User.findByIdAndUpdate(userToUnfollow.id, {
      $pull: { followers: currentUser.id }
  });

  await User.findByIdAndUpdate(currentUser.id, {
      $pull: { following: userToUnfollow.id }
  });

  res.status(200).json({ message: `You have unfollowed ${userToUnfollow.username}` });
});



module.exports = {
  registerUser,
  loginUser,
  updateUser,
  getMe,
  genJWT,
  refreshAccessToken,
  deleteUser,
  followUser,
  unfollowUser,
  getByUsername,
  getFollowers,
  getFollowing,
}