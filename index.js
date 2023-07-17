const express = require('express')
const path = require('path')
const port = process.env.PORT || 8000
const flash = require('express-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const app = express()

app.use(flash())
app.use(session({
    secret : 'secret',
    saveUninitialized : false,
    resave : false,
}))
app.use(cookieParser())
require('dotenv').config()

app.set('view engine','ejs') 
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'assets')))

app.use(express.urlencoded())
require('./config/database')

app.use('/admin',require('./router/admin.router'))
app.get('/admin',(req,res)=>{
    res.redirect('/admin/login')
})

app.use('/',require('./router/user.router'))
app.get('/',(req,res)=>{
    res.redirect('/user_login')
})

app.use((req,res)=>{
    res.render('404-error')
})

app.listen(port,(err)=>{
    if(err){
        console.log(err);
    } else {
        console.log('server is running on',port);
    }
})