const express = require('express')
const user = require('../model/user.model')
const cloudinary = require('../cloud/cloudinary')
const jwt = require('jsonwebtoken')

//user registration get method
exports.user_registration = async(req,res)=>{
    try {
        res.render('user_registration')
    } catch (error) {
        console.log(error,'catch error');
    }
}

//user registration post method
exports.user_registrationdata = async(req,res)=>{
    try {
        console.log(req.body);
        var name = req.body.name
        var email = req.body.email
        var password = req.body.password
        var find = await user.findOne({ email })
        if (find == null) {
            var data = await user.create({
                name,
                email,
                password
            })
            console.log(data);
            console.log('registration successfully');
            req.flash('success', 'registration successfully')
            res.redirect('/user')
        } else {
            console.log('email already exits');
            req.flash('success', 'email already exits')
            res.redirect('back')
        }
    } catch (error) {
        console.log(error,'catch error');
    }
}

//user login get method
exports.user_login = async(req,res)=>{
    try {
        res.render('user_login')
    } catch (error) {
        console.log(error,'catch error');
    }
}

//user login post method
exports.user_logindata = async(req,res)=>{
    try {
        console.log(req.body);
        var email = req.body.email
        var password = req.body.password
        var find = await user.findOne({email})
        if(find == null){
            console.log('please register or enter valid email address');
            req.flash('success','please register or enter valid email address')
            res.redirect('back')
        } else {
            if(find.password == password){
                console.log('login successfully');
                req.flash('success','login successfully')

                var usertoken = await jwt.sign({userid : find._id},process.env.KEY)
                res.cookie('user_jwt',usertoken,{expires:new Date(Date.now()+24*60*60*1000)})

                res.redirect('/user')
            } else {
                console.log('enter valid password');
                req.flash('success','enter valid password')
                res.redirect('back')         
            }
        }
    } catch (error) {
        console.log(error,'catch error');
    }
}

//user home get method
exports.user_home = async(req,res)=>{
    try {
        res.render('user_home')
    } catch (error) {
        console.log(error,'catch error');
    }
}

//user about get method
exports.user_about = async(req,res)=>{
    try {
        res.render('user_about')
    } catch (error) {
        console.log(error,'catch error');
    }
}

//user blog get method
exports.user_blog = async(req,res)=>{
    try {
        res.render('user_blog')
    } catch (error) {
        console.log(error,'catch error');
    }
}

//user services get method
exports.user_services = async(req,res)=>{
    try {
        res.render('user_services')
    } catch (error) {
        console.log(error,'catch error');
    }
}