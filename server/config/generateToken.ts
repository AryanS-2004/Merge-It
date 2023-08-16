import jwt, { Secret } from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

export const generateToken  = (id: ObjectId) => {
    const token = jwt.sign({id}, process.env.JWT_SECRET_KEY as Secret, {
        expiresIn: "30d"
    });
    return token;
}
