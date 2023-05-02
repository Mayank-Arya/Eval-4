const express = require('express')
const { connection } = require('./db')
const {userRouter} = require('./routes/user.routes')
const redisClient = require('./redis')
const logger = require('./middleware/logger')
const {auth} = require('./middleware/auth.middelware')
const { ipRouter } = require('./routes/ip.routes')

require('dotenv').config()
const app = express()
app.use(express.json())


app.get('/',(req,res)=>{
    res.send("Home Page")
})


app.use("/user",userRouter)

app.use("/connect",auth,ipRouter)

redisClient.connect()

app.listen(process.env.PORT,async()=>{
    try{
    await connection
    console.log("Connected to DB")
    logger.log('info',"DB Connected")
    }
    catch(err){
    res.status(400).send(err.message)
    logger.log('error',"Something wrong to connect")
    }
    console.log("Server is Running at",process.env.PORT)
})