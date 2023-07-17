const express = require('express')
const admin = require('../model/admin.model')
const cloudinary = require('../cloud/cloudinary')
const jwt = require('jsonwebtoken')

//registration data post method
exports.registrationdata = async (req, res) => {
    try {
        console.log(req.body);
        var username = req.body.username
        var email = req.body.email
        var password = req.body.password
        var find = await admin.findOne({ email })
        if (find == null) {
            var data = await admin.create({
                username,
                email,
                password
            })
            console.log('registration successfully');
            req.flash('success', 'registration successfully')
            res.redirect('back')
        } else {
            console.log('email already exits');
            req.flash('success', 'email already exits')
            res.redirect('back')
        }
    } catch (error) {
        console.log(error, 'catch error');
    }
}

//login get method
exports.login = async (req, res) => {
    try {
        var data = await admin.find({})
        res.render('login', { data })
    } catch (error) {
        console.log(error, 'catch error');
    }
}

//login data post method
exports.logindata = async (req, res) => {
    try {
        console.log(req.body);
        var email = req.body.email
        var password = req.body.password
        var find = await admin.findOne({ email })
        if (find == null) {
            console.log('please register or enter valid email address');
            req.flash('success', 'please register or enter valid email address')
            res.redirect('back')
        } else {
            if (find.password == password) {
                console.log('login successfully');
                req.flash('success', 'login successfully')

                var token = await jwt.sign({userid : find._id},process.env.KEY)
                res.cookie("jwt",token,{expires:new Date(Date.now()+24*60*60*1000)})

                res.redirect('/admin/dashboard')
            } else {
                console.log('enter valid password');
                req.flash('success', 'enter valid password')
                res.redirect('back')
            }
        }
    } catch (error) {
        console.log(error, 'catch error');
    }
}

//forgot password get mehod
exports.forgot_password = async (req, res) => {
    try {
        res.render('forgot_password')
    } catch (error) {
        console.log(error, 'catch error');
    }
}

//dashboard get method
exports.dashboard = async (req, res) => {
    try {
        res.render('dashboard')
    } catch (error) {
        console.log(error, 'catch error');
    }
}

//form get method
exports.form = async (req, res) => {
    try {
        console.log(req.cookies);
        res.render('forms')
    } catch (error) {
        console.log(error, 'catch error');
    }
}

//table get method
exports.table = async (req, res) => {
    try {
        var data = await admin.find({})
        res.render('table', { data })
    } catch (error) {
        console.log(error, 'catch error');
    }
}

//deletedata get method
exports.deletedata = async (req, res) => {
    try {
        var data = await admin.findByIdAndDelete(req.params.id)
        if (data) {
            console.log('data deleted successfully');
            req.flash('success', 'data deleted successfully')
            res.redirect('back')
        } else {
            console.log('data not deleted successfully');
            req.flash('success', 'data not deleted successfully')
            res.redirect('back')
        }
    } catch (error) {
        console.log(error, 'catch error');
    }
}

//update page get method
exports.updatepage = async (req, res) => {
    try {
        var data = await admin.findById(req.params.id)
        res.render('update', { data })
    } catch (error) {
        console.log(error, 'catch error');
    }
}

exports.updatedata = async (req, res) => {
    try {
        var data = await admin.findById(req.params.id)
        if(req.file){
            cloudinary.uploader.destroy(data.img_id,(err,result)=>{
                if(err){
                    console.log(err);
                } else {
                    console.log(result);
                }
            })
        }
        console.log(req.file);
        if (req.file) {
            var imgdata = await cloudinary.uploader.upload(req.file.path)
            var img = imgdata.secure_url
            var img_id = imgdata.public_id
        }
        var email = req.body.email
        req.body.img = img
        req.body.img_id = img_id
        var find = await admin.find({email});
       
        console.log(find.length);
        if (find.length==0) {
            var update = await admin.findByIdAndUpdate(req.params.id, req.body)
            if (update) {
                console.log('data updated successfully');
                req.flash('success', 'data updated successfully')
                res.redirect('/admin/table')
            } else {
                console.log('data not updated successfully');
                req.flash('success', 'data not updated successfully')
                res.redirect('back')
            }
        } else {
            console.log('updated email already exits');
            req.flash('success','updated email already exits')
            res.redirect('back') 
        }
    } catch (error) {
        console.log(error, 'catch error');
    }
}
