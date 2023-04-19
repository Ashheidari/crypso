import jwt from 'jsonwebtoken';
import HttpError from '../models/Http-error.js';

export const isAuth = (req,res,next)=>{
    try{
        const token = req.header('Authorization').split(' ')[1]; // Header: 'bearer TOKEN'
        if (!token){
            throw new Error('Authorization failed');
        }
        const decodedToken = jwt.verify(token,process.env.JWTSECRET);
        req.userData = decodedToken;
        next();

    }
    catch(err){
        const error = new HttpError('Authorization failed',403);
        return next(error);
    }

    
}

