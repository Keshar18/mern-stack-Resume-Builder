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

// let's add work exp..

    workExp:[{
        company:String,
        role:String,
        startDate:String,
        endDate:String,
        description: String,
    },
],
    education:[{
        institution: String,
        degree: String,
        fieldOfStudy: String,
        startDate: String,
        endDate: String,
    },
],
    skills:[{
        name: String,
        progress: String,
    },
],

    projects:[{
        title: String,
        description: String,
        github: String,
        liveDemo: String,
    },
],

    certifications:[{
        title: String,
        issuer: String,
        year: String,
        credentialId: String,
    },
],

    languages:[{
        name: String,
        progress: Number,
    },
],

     interests:[String],
},
{
    timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}
}
);

export default mongoose.model('Resume', ResumeSchema);