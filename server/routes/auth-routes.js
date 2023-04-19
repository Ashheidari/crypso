import express from "express";
import {login, signup} from "../controllers/auth.js";
import fileUpload from "../middleware/file-upload.js";

const router = express.Router();



router.post('/signup',fileUpload.single('image'), signup);
router.post('/login', login);


export default router
