const winston = require('winston')
require('dotenv').config()
const {MongoDB} = require('winston-mongodb')

const logger = winston.createLogger({
    level:'info',
    format: winston.format.json(),
    transports: [
        new MongoDB ({
            db:process.env.mongo_URL,
            collection: 'logs',
            options: {
                userUnifiedTopology:true
            }
        })
    ]
})

module.exports = logger
