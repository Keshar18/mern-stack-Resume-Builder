import mongoose from 'mongoose';

const ResumeSchema= new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title:{
        type: String,
        required: true
    },
    thumbnailLink:{
        type: String,
    },
    template:{
        theme: String,
        colorPalette: [String],
    },

    profileInfo:{
        profilePreviewUrl: String,
        fullName: String,
        designation: String,
        summary: String
    },


    contactInfo:{
        email: String,
        phone: String,
        address: String,
        linkedIn: String,
        github: String,
        website: String
    },



   