import express from 'express';
import userRoutes from './routes/userRoutes';
import issueRoutes from './routes/issueRoutes';
import repoRoutes from './routes/repoRoutes';
import {connectDB} from './config/db';
import {notFound, errorHandler} from "./middleware/errorMiddleware";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

connectDB();

const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());


app.use("/api/user", userRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/repos", repoRoutes);

app.get("/", (req, res)=>{
    res.json({msg: "The server is working, Nothing to worry about."})
})


//Error handling 
app.use(notFound);
app.use(errorHandler);


app.listen(port, () => {
    console.log("The server is listening on port " + port);
});