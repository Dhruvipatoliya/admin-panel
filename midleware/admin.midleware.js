const jwt = require('jsonwebtoken')
const admin = require('../model/admin.model')
const admin_token = async(req,res,next)=>{
    var token = req.cookies.jwt
    if(token){
        console.log(token);
        var userdata = await jwt.verify(token,process.env.KEY,(err,data)=>{
            if(err){
                console.log(err);
            } else {
                return data;
            }
        })
        if(userdata == undefined){
            res.redirect('/')
        } else {
            var data = await admin.findById(userdata.userid)
            if(data == null){
                res.redirect('/')
            } else {
                next();
            }
        }
    } else {
        res.redirect('/')
    }
}

module.exports = admin_token