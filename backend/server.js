const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const colors = require('colors')
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const port = process.env.PORT

connectDB()
const app = express()

//middleware
app.use(express.json()) // Parse JSON bodies
app.use(express.urlencoded({extended: false})) // Parse URL-encoded bodies

app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})