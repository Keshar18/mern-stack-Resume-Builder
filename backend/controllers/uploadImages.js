import fs from 'fs'
import path from 'path'

import resume from '../models/resumeModel.js';
import upload from '../middleware/uploadMiddleware.js';

import { error } from 'console'

export const uploadResumeImages= async(req,res)=>{
    try {
        //configure multer to handle images
        upload.fields([{name: "thumbnail"}, {name: "profileImage"}])
        (req,res, async(err)=>{
            if(err){
                return res.status(400).json({message:"file upload failed", err:message})
            }
            const resumeId=req.params.id;
            const resume= await Resume.findOne({_id:resumeId, userId:req.user._id});

            if(!resume){
                return res.status(404).json({message:"Resume not found", error: error.message});
            }
            //use process CWD to locate uploads folder
            const uploadsFolder= path.join(process.cwd(), 'uploads');
            const baseUrl= `${req.protocol}://${req.get('host')}`;

            const newThumbnail= req.files.thumbnail?.[0];
            const newProfileImage= req.files.profileImage?.[0];

            if(newProfileImage){
                if(resume.profileInfo?).profilePreview{
                    const oldThumbnail= path.join(uploadsFolder, path.basename(resume.thumbnailLink));
                    if(fs.existsSync(oldThumbnail))
                        fs.unlinkSync(oldThumbnail);
                }
                resume.thumbnailLink= `${baseUrl}/uploads/${newThumbnail.filename}`;
            }
        }

}catch (error) {
        res.status(500).json({message:"Image upload failed", error:error.message});
        
    }

}