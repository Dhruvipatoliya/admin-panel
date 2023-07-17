const express = require('express')

exports.user_login = async(req,res)=>{
    try {
        res.render('user_login')
    } catch (error) {
        console.log(error,'catch error');
    }
}

exports.user_logindata = async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error,'catch error');
    }
}