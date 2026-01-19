import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const protect=async(req,res,next)=>{
    try {
        let token = req.headers.authorization;
        if(token  && token.startsWith("Bearer")){
            token= token.split(" ")[1];         //getting token part only
            const decoded= jwt.verify(token, process.env.JWT_SECRET);
            req.user= await User.findById(decoded.id).select('-password');
            req.user=await User.findById(decoded.id).select('-password');
            next();
        }   
        else{
            res.status(401).json({message:"not authorized, no token"});
        }   
    } catch (error) {
        res.status(401).json({message:"token failed", error:error.message});
    }
};

export default protect;