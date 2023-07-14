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
router.get('/forgot_password',admin_token,forgot_password)
router.get('/dashboard',admin_token,dashboard)
router.get('/forms',admin_token,form)
router.get('/table',admin_token,table)
router.get('/deletedata/:id',admin_token,deletedata)
router.get('/update/:id',admin_token,updatepage)
router.post('/updatedata/:id',upload.single('img'),admin_token,updatedata)
router.get('/logout',async(req,res)=>{
    res.cookie('jwt','')
    res.clearCookie();
    res.redirect('/dashboard') 
})

module.exports = router 