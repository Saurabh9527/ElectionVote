
const jwt = require('jsonwebtoken')
require('dotenv').config();

const jwtAuthMiddleware = (req , res , next) =>{

    //*first check request header authorized or not
    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({error : "Token not found"});

    //* we extracting token from header and  splitting because token come like [bearer tokendetails]
    const token = req.headers.authorization.split(" ")[1];

    if(!token) return res.status(401).json({error : "Unauthorized"});

    try {  //*if token found

        //*it return payload [we stored in decode variable]  which we used while while creating jwt token
        const decode = jwt.verify(token , process.env.JWT_SECRET);

        //*now we pass this information to the user
        req.user = decode;  //* here user is varaible name can be different ex[userPayload , userData]
        next();
    } catch (error) {
            console.log(error);
            res.status(401).json({error : "Invalid Token"})
    }
};

//*Generate JWT Token
const generateToken = (userData) =>{
    //~Generate new JWT token using user data
    return jwt.sign(userData , process.env.JWT_SECRET);
}

module.exports = { jwtAuthMiddleware , generateToken }