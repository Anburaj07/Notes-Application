const express=require("express")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const { UserModel } = require("../model/user.model");
const userRouter=express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *          id:
 *             type: string
 *             description: The auto-generated id of the user
 *          username:
 *              type: string
 *              description: The user name
 *          email:
 *              type: string
 *              description: The user email
 *          pass:
 *              type: string
 *              description: The user password
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: All the API routes related to User
 */

//JS doc comments
/**
 * @swagger
 * /users/register:
 *  post:
 *      summary: To post the details of new user
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/User"
 *      responses:
 *          200:
 *              description: The new user has been registered
 *              content:
 *                  application/jon:
 *                      schema:
 *                          $ref: "#/components/schemas/User"
 *              
 *          500:
 *              description: Internal server Error
 */

userRouter.post("/register",async(req,res)=>{
    const {username,email,pass}=req.body;
    try {
        bcrypt.hash(pass,7,async(err,hash)=>{
            const user=new UserModel({username,email,pass:hash})
            await user.save()
            res.status(200).json({msg:"The new user has been registered",user})
        })
    } catch (error) {
        console.log('error:', error)
        res.status(400).json({error})
    }
})

/**
 * @swagger
 * /users/login:
 *  post:
 *      summary: To login the details of user
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/User"
 *      responses:
 *          200:
 *              description: Login successful!
 *              content:
 *                  application/jon:
 *                      schema:
 *                          $ref: "#/components/schemas/User"
 *              
 *          500:
 *              description: Internal server Error
 */

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body;
    try {
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result){
                    var token=jwt.sign({userID:user._id,username:user.username},"masai",{expiresIn:'3h'})
                    res.status(200).json({msg:"Login successful!",token})
                }
            })
        }else{
            res.status(400).json({error:"Wrong Credentials!!"})
        }
    } catch (error) {
        res.status(400).json({ error})
    }
})

module.exports={userRouter}