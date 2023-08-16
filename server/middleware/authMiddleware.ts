import jwt, { Secret } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const auth =  async (req : Request, res : Response, next : NextFunction) => {
    let token;

    if(
        req.headers.authorization
    ){
        try{
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as Secret);

            if(!decoded ||  typeof(decoded) === "string" ){
                return res.status(500).send("Id not found in authHandler")
            }
            req.headers["userId"] = decoded.id;

            next();
        }catch(error){
            res.status(401);
            throw new Error("Not authorized, invalid token");
        }
    }else{
        res.status(404);
        throw new Error("Token not avaialable");
    }
}

export default auth;