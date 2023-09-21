const express=require("express")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const { UserModel } = require("../model/user.model");
const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {username,email,pass}=req.body;
    try {
        bcrypt.hash(pass,7,async(err,hash)=>{
            const user=new UserModel({username,email,pass:hash})
            await user.save()
            res.status(200).send({"msg":"The new user has been registered",user})
        })
    } catch (error) {
        console.log('error:', error)
        res.status(400).send({"error":error})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body;
    try {
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result){
                    var token=jwt.sign({userID:user._id,username:user.username},"masai",{expiresIn:'3h'})
                    res.status(200).json({"msg":"Login successful!", "token": token})
                }
            })
        }else{
            res.status(400).send({"error":"Wrong Credentials!!"})
        }
    } catch (error) {
        res.status(400).send({"error": error})
    }
})

module.exports={userRouter}