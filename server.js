const express = require('express')
const app = express();
const dotenv = require('dotenv').config()
const indexRouter = require('./routes/post_routes')

const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true})

const db = mongoose.connection
db.on('error', (error) => {
    console.error(error)
})
db.once('open', () => {
    console.log('Connected to mongoDB')
})

const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended: true, limit: '1mb'}))
app.use(bodyparser.json())


app.use('/post', indexRouter)

module.exports = app
