import path from "path";
import {fileURLToPath} from "url";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth-routes.js";
import userRoutes from './routes/user-routes.js';
import postRoutes from "./routes/post-routes.js";

/* configuration */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(morgan("common"));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
const PORT = process.env.PORT || 6001;



app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/post', postRoutes)




app.use((error, req, res, next)=>{
    if(res.headerSent){
        next(error);
    }
    res.status(error.statusCode || 500);
    res.json({message:error.message || "an unknown error occured"})
})


/* Database Configuration */
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on PORT ${PORT}`);
    });
  }).catch((error)=>{
    console.log(error);
  });
