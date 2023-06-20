const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
const asyncHandler = require('express-async-handler');

const auth = asyncHandler( async (req, res, next) => {
    let token;

    if(
        req.headers.authorization
    ){
        try{
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

            req.user = await User.findById(decoded.id).select('-password');

            next();
        }catch(error){
            res.status(401);
            throw new Error("Not authorized, invalid token");
        }
    }else{
        res.status(404);
        throw new Error("Token not avaialable");
    }
})

module.exports = auth;