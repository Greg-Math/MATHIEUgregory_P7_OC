const express = require('express')
const path = require('path')
const rateLimit = require('express-rate-limit')
//const helmet = require('helmet')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const commentRoutes = require('./routes/comment')

const app = express()
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
})


app.use(limiter)
//app.use(helmet({crossOriginResourcePolicy: false}))

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

app.use('/media', express.static(path.join(__dirname, 'media')))
app.use('/auth', authRoutes)
app.use('/profile', userRoutes)
app.use('/posts', postRoutes)
app.use('/comment', commentRoutes)


module.exports = app