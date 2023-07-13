const mongoose = require('mongoose')
const db = mongoose.connection
mongoose.connect('mongodb://127.0.0.1/admin')
db.once('open',(err)=>{
    if(err){
        console.log(err,'database is not connected');
    } else {
        console.log('database is connected'); 
    }
}) 