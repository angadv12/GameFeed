const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const colors = require('colors')
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser');
const path = require('path')
const cors = require('cors')

const port = process.env.PORT

connectDB()
const app = express()

app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

// middleware
app.use(express.json()) // Parse JSON bodies
app.use(express.urlencoded({extended: false})) // Parse URL-encoded bodies
app.use(cookieParser()) // Parse cookies
app.use(cors())

// routes
app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/', require('./routes/nbaRoutes'))
app.use('/api/', require('./routes/newsRoutes'))
app.use('/api/comments', require('./routes/commentRoutes'))
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})