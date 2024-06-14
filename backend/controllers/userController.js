const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

// @desc  register User
// @route POST /api/users
// @access Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body

  if( !name || !email || !password ) {
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
    email,
    password: hashedPass,
  })
  if(user) {
    res.status(201).json({ //201: OK and resource created
        _id: user.id,
        name: user.name,
        email: user.email,
        token: genJWT(user._id)
    })
} else {
    res.status(400) //Error: bad request
    throw new Error('Invalid user data')
}
}

// @desc login a User
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler( async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({email})
  if(user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({ //200: OK
      _id: user.id,
      name: user.name,
      email: user.email,
      token: genJWT(user._id)
    })
  } else {
    res.status(400) //400: bad request
    throw new Error('Invalid email or password')
  }
  
})

// @desc  get user data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler( async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id)

  res.status(200).json({
      id: _id,
      name,
      email,
  })
})

// @desc  generate json webtoken
const genJWT = (id) =>{
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d' //token expires in 30 days
  })
}


module.exports = {
  registerUser,
  loginUser,
  getMe,
  genJWT,
}