const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { refreshAccessToken } = require('../controllers/userController')

const protect = asyncHandler( async (req, res, next) => {
  let token

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
        //get token from header
        token = req.headers.authorization.split(' ')[1]

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET) //gets payload (id)

        //get user from token
        req.user = await User.findById(decoded.id).select('-password') //payload is id
        // wont include password ^

        next()
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        // Handle token expiration
        const refreshToken = req.cookies.refreshToken
        if (refreshToken) {
          try {
            await refreshAccessToken(req, res, next)
          } catch (refreshError) {
            console.error('Refresh token error:', refreshError);
            res.status(401);
            throw new Error('Not authorized, token expired');
          }
        } else {
          res.status(401);
          throw new Error('Not authorized, no refresh token');
        }
      } else {
        console.log('JWT Verification Error:', error);
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
})

module.exports = { protect }