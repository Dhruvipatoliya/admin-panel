const jwt = require('jsonwebtoken')
const admin_token = async(req,res,next)=>{
    var token = req.cokkies.jwt
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
            next();
        }
    } else {
        res.redirect('/')
    }
}