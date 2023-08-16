import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        repos: [
            {
                type: String,
                trim: true,
            },
        ],
    },
    {
        timestamps: true,
    }
);

interface IUser {
    name: string;
    email: string;
    password: string;
    repos: string[]; // Specify the correct type for the 'repos' property
}

interface IUserDocument extends IUser, Document {
    matchPassword(enteredPassword: string): Promise<boolean>;
}

userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error: any) {
        return next(error);
    }
});

const User = mongoose.model<IUserDocument>('User', userSchema);

export default User;
