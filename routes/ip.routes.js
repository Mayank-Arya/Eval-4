const {Router} = require('express')
const axios =  require('axios')
const {ipModel} = require('../models/ip.model')
const jwt = require('jsonwebtoken')
const redisClient = require('../redis')
const ipRouter = Router()

ipRouter.get('/:IP',async(req,res)=>{
try{

const IP = req.params.IP

const IsIpIncache = await redisClient.get(`${ipModel}`)

if(IsIpIncache) return res.status(200).send({data:IsIpIncache})
  
const response = await axios.get(`https://ipapi.co/${IP}/json/`)

const data = response.data;

console.log(data)

redisClient.set(IP,JSON.stringify(data),{EX:6*60*60})

await ipModel.findOneAndUpdate({userId:req.body.userId},
    {userId:req.body.userId,$push: {previousSearched: IP}
},{new:true, upsert:true})

return res.send({data})

}
catch(err){
res.status(400).send(err.message)
}
})


module.exports = {ipRouter}

