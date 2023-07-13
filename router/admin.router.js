const express = require('express')
const router = express.Router()
const {
    registration,
    registrationdata,
    login,
    logindata,
    forgot_password,
    dashboard,
    form,
    table,
    deletedata,
    updatepage,
    updatedata,
} = require('../controller/admin.controller')
const upload = require('../cloud/multer')
const admin_token = require('../midleware/admin.midleware')

router.get('/registration',registration)
router.post('/registrationdata',registrationdata)
router.get('/',login)
router.post('/logindata',logindata)
router.get('/forgot_password',forgot_password)
router.get('/dashboard',dashboard)
router.get('/forms',form)
router.get('/table',table)
router.get('/deletedata/:id',deletedata)
router.get('/update/:id',updatepage)
router.post('/updatedata/:id',upload.single('img'),updatedata)

module.exports = router