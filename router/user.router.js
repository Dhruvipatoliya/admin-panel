const express = require('express')
const router = express.Router()
const {
    user_registration,
    user_registrationdata,
    user_login,
    user_logindata,
    user_home,
    user_about,
    user_blog,
    user_services,
} = require('../controller/user.controller')
const upload = require('../cloud/multer')
const user_token = require('../midleware/user.midleware')

router.get('/user_registration',user_registration)
router.post('/user_registrationdata',user_registrationdata)
router.get('/user_login',user_login)
router.post('/user_logindata',user_logindata)
router.get('/',user_home)
router.get('/user_about',user_token,user_about)
router.get('/user_blog',user_token,user_blog)
router.get('/user_services',user_token,user_services)

module.exports = router