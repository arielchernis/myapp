const express = require('express')
const router = express.Router()

router.get('/',(req, res) => {
    res.send('Hello api')
})

router.post('/post',(req, res) => {
    res.send('IM POSTING!!!!')
})

module.exports = router