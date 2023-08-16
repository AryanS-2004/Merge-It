import asyncHandler from 'express-async-handler';
import User from '../models/userModels';
import {generateToken} from "../config/generateToken";
import { Request, Response } from 'express';
import { ObjectId } from 'mongoose';


interface ReqBody{
    email: string,
    password: string,
}


export const registerUser  = async(req: Request, res : Response) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please enter all the fields.");
    }
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400);
        throw new Error("User already exist.");
    }
    else{
        const user =  await User.create({
            name, email, password
        });
        const userId : any = user?._id;
        if(user ){
            res.status(201).json({
                _id: userId,
                name: user.name,
                email: user.email,
                token: generateToken(userId)
            });
        }
        else{
            res.status(401);
            throw new Error("Failed to create user, please try again.");
        }
    }
}

export const authUser = async (req : Request, res : Response) => {
    const {email, password} : ReqBody = req.body;

    const user = await User.findOne({email});
    const userId : any= user?._id;

    if(user && (await user.matchPassword(password))){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(userId)
        });
    }
    else{
        res.status(401);
        throw new Error("Invalid email or password.");
    }
}

