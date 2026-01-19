import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//now  generating token here
const generateToken = (id)=>{
    return jwt.sign({id:id}, process.env.JWT_SECRET,{expiresIn:7*24*60*60});
}

export const registerUser=async(req,res)=>{
    try{
    const{name, email, password}= req.body;

    //check if user already exists or not
    const UserExists= await User.findOne({email});
    if(UserExists){
        return res.status(400).json({message:"user already exists"})
    }
    if(password.length<8){
        return res.status(400).json({success:false, message:"password must be at least 8 characters long"})
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // now creating user
    const user= await User.create({
        name,
        email,
        password:hashedPassword
    })

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400).json({message:"invalid user data"})
    }
}

catch(error){
    res.status(500).json({message:"server error",
        error:error.message})
    }
}


//now creating login function

export const loginUser= async(req,res)=>{
    try{
        const{email, password}= req.body;
        const user= await User.findOne({email})
        if(!user){
            return res.status(500).json({message:"user not found"})
        }

        // now comparing password
        const isPasswordMatch= await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({message:"invalid password"})
        }

        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }
    catch(error){

    }
}

//getting user profile function
export const getUserProfile= async(req,res)=>{
    try{
       const user=await User.findById(req.user._id).select('-password');
       if(!user){
        return res.status(404).json({message:"user not found"})
       }
       res.status(200).json(user);
    }
    catch(error){

    } 
}