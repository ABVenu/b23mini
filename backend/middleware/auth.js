var jwt = require('jsonwebtoken');

const auth = async(req,res,next)=>{
     
    // console.log(req.headers)
    let token = req.headers.authorization.split(" ")[1];
    
    try{
        var decoded = jwt.verify(token, 'shhhhh');
        console.log("D" , decoded)
        req.body.userName = decoded.userName;
        req.body.role = decoded.role
        if(decoded){
            next()
        }
        else{
            res.send({msg:"Not Authorized, Please Login"})
        }
    }
    catch(err){
        console.log(err);
        res.send({msg:"something went wrong", errMsg: err})
    }
   
    
}

module.exports = {auth}