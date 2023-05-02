const jwt = require('jsonwebtoken')
const redisClient = require('../redis')

const auth = async(req,res,next) => {
  
try{
  const token = req.headers.authorization


  if(!token) return res.status(400).send("Please login")

  const IsTokenValid = await jwt.verify(token, process.env.JWT_SECRET)

  if(!IsTokenValid) return res.send("Authentication failed, you need to login")

  const isTokenBlacklisted = await redisClient.get(token)

  if(isTokenBlacklisted) return res.send("Unauthoriezed") 

  req.body.userId = IsTokenValid.userId
  req.body.city = IsTokenValid.city

  next()

}
catch(err){
    res.send(err.message)
}

}

module.exports = {auth}