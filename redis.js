const redis = require('redis')

const redisClient = redis.createClient({
    url: "redis://default:wFknBkcyAOmfP4UFNgc1zVEJTh8SpSrS@redis-14680.c92.us-east-1-3.ec2.cloud.redislabs.com:14680"
})

module.exports = redisClient