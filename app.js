const express = require('express')
const app = express();
const dotenv = require("dotenv").config()
const port = process.env.port
const indexRouter = require('./routes/post_routes')

app.use('/',indexRouter)


app.listen(port, () => {
console.log('app is running on port ' + port)
});