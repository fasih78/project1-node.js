const requestIp = require ('request-ip')


const  ipMiddleware = function(req, res, next) {
    var clientIp = requestIp.getClientIp(req);
    console.log(clientIp , "client ip") 
    next();
};



module.exports = ipMiddleware