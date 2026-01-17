import mongoose from "mongoose";
export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://keshargupta6695_db_user:resumebuilder123@cluster0.cqveq1o.mongodb.net/RESUME')
    .then(()=>{
        console.log("MongoDB connected successfully");
    })
}