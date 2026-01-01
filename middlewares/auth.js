const jwt = require('jsonwebtoken');
const User = require('../models/user-model');
const secretKey = process.env.JWT_SECRET || 'your_jwt_secret_key';

const authMiddleware = async(req,res,next)=>{
    try{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message: "Authorization header missing or malformed"});
    }

    //sign 
    const token = authHeader.split(" ")[1];
    
        const decoded = jwt.verify(token,secretKey);
        // 3. Attach user info to request
        req.user ={
            userId : decoded.user_id,
            role : decoded.role
        };
        next();


    }catch(e){
        return res.status(401).json({message: "Invalid or expired token"});
    }

}

module.exports = authMiddleware;