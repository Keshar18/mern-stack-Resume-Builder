import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect('mongodb+srv://keshargupta6695_db_user:resumebuilder123@cluster0.cqveq1o.mongodb.net/RESUME')
        .then(()=>{
            console.log("MongoDB connected successfully");
        })
    }catch(error){
        console.error("Error connecting to MongoDB:", error);
    }
}