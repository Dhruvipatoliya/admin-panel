const express = require('express')
const router = express.Router()
const {
    user_login,
    user_logindata,
} = require('../controller/user.controller')

router.get('/',user_login)
router.post('/user_logindata',user_logindata)

module.exports = router