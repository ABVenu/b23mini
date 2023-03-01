const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const { auth } = require("../middleware/auth");
const userRoute = express.Router();


userRoute.get("/",auth ,async(req,res)=>{
    let data = await UserModel.find();
    res.send(data)
})

userRoute.get("/ind/:id",auth ,async(req,res)=>{
    let data = await UserModel.findOne({_id:req.params.id});
    res.send(data)
})

userRoute.patch("/update/:id",auth ,async(req,res)=>{
    // console.log("kkkk",req.body)
    if( req.body.role=="Admin"){
        let data = await UserModel.findOneAndUpdate({_id:req.params.id},req.body)
        res.send({msg:"User Details Update Sucessfull"})
    }
    else{
        res.send({msg:"You are not authorised to update"})
    }
   
})


userRoute.post("/register", async(req,res)=>{
    let { username, email,dob,role,location,password} = req.body;
    // console.log(data)
    try{
                let user = await UserModel.find({email});
            if(user){
            let hashedPassword = bcrypt.hashSync(password, saltRounds);

            let registerUser = new UserModel({username,email,dob,role,location,password:hashedPassword})
            await registerUser.save();
            res.send({msg:"User Registered Sucessfully", userName: username, emailId:email, status:true})
            }
            else{
                res.send({msg:"something went wrong"})
            }
    }
    catch(err){
        res.send({msg:"UserName/Email Already Exists", errMsg: err})
    }
   
})


userRoute.post("/login", async(req,res)=>{
    let { _id, username, password} = req.body;
    // console.log(req.body)
    try{
       let existingUser = await UserModel.findOne({username});
       console.log(existingUser)
       if(existingUser){
        console.log("yes")
        let hashedPassword = existingUser.password;
        // console.log(hashedPassword);
        let pass = bcrypt.compareSync(password, hashedPassword);
          if(pass){
            var token = jwt.sign({ userName: username, userId: _id, role: existingUser.role}, 'shhhhh');
            res.send({msg:"Signin Sucessfull", token:token, status:true})
          }else{
            res.send({msg:"Wrong Password"})
          }
        
       }
       else{
        res.send({msg:"Check UserName or Password, Both are case sensitive"})
       }
    }
    catch(err){
        res.send({msg:"something went wrong, Please try later",errMsg: err })
    }

})


module.exports = {userRoute}


