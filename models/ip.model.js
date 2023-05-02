const mongoose = require('mongoose')

const ipSchema = mongoose.Schema({
    IP:{type:String,required:true},
    userId: {type:String,required:true}
})

const ipModel = mongoose.model('IP-address',ipSchema)

module.exports = {ipModel}