import mongoose from 'mongoose';

export const connectDB = async ()=>{
    try{
        if(!process.env.MONGO_URI){
            throw new Error("MONGO URI Missing!!!!!");
        }
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected : ${conn.connection.host}`);
    }catch(error: any){
        console.log(`Error:  ${error.message}`);
        process.exit();
    }
}
