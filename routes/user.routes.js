const {Router} = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const redisClient = require('../redis')
const {userModel} = require('../models/user.model')
const userRouter = Router()

userRouter.post('/signup',async (req,res) =>{

    try{

        const {name,email,password,city} = req.body;
        
        const isUserPresent = await userModel.findOne({email});
         if(isUserPresent) return res.send("User already Present, login please");
         
         const hash = await bcrypt.hash(password,8);

         const newUser = new userModel({name, email, password:hash, city});

         await newUser.save();

         res.send("Signup Successful")

    } catch(err) {
          
        res.send(err.message);
    }

})


  userRouter.post('/login',async (req,res)=> {

    try {
         
        const {email, password} = req.body;

        const isUserPresent  = await userModel.findOne({email});

        if(!isUserPresent) return res.send("user not present, Register please");

        const isPasswordCorrect = await bcrypt.compare(password,isUserPresent.password);

        if(!isPasswordCorrect) return res.send("Invalid Credentials");

        const token = await jwt.sign({userId:isUserPresent._id,city:isUserPresent.city},process.env.JWT_SECRET, {expiresIn:"1hr"})

        res.status(200).send({message: "Login Success", token});


    } catch(err) {
         res.status(400).send(err.message)
    }
})

   
userRouter.get("/logout",async (req,res) =>{

    try{

        const token = req.headers?.authorization

        if(!token) return res.status(403);

        await redisClient.set(token,token);
        res.send("logout successful");


    }catch(err) {
        res.send(err.message)
    }
})
   
      



module.exports = {userRouter}