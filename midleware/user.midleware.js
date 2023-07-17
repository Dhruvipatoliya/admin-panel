const jwt = require('jsonwebtoken')
const user = require('../model/user.model')
const user_token = async(req,res,next)=>{
    var usertoken = req.cookies.user_jwt
    console.log(req.cookies,"bxsyuag");
    if(usertoken){
        var userdata = await jwt.verify(usertoken,process.env.KEY,(err,data)=>{
            if(err){
                console.log(err);
            } else {
                return data;
            }
        })
        if(userdata == undefined){
            res.redirect('/user') 
        } else {
            var data = await user.findById(userdata.userid)
            if(data == null){
                res.redirect('/user')
            } else {
                next(); 
            }
        } 
    } else {
        res.redirect('/user')
    }
}

module.exports = user_token