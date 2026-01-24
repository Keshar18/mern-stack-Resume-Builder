import resume from '../models/resumeModel.js';
import fs from 'fs';
import path from 'path';


// DATA FOR CREATE RESUME CONTROLLER


export const createResume = async (req, res) => {
    try {
        const { title } = req.body;

        // Default template
        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                },
            ],
            skills: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: '',
                    description: '',
                    github: '',
                    liveDemo: '',
                },
            ],
            certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
            languages: [
                {
                    name: '',
                    progress: '',
                },
            ],
            interests: [''],
        };
        const newResume = new Resume.create({
            userId: req.user._id,
            title,
            ...defaultResumeData,
            ...req.body
        })
        res.status(201).json(newResume)
        }        
        
    catch (error) {
            res.status(500).json({ message: 'Failed to create resume', error: error.message });//500 server error
    }
}


//GET function to fetch all resumes for a user

export const getUserResumes= async(req,res)=>{
    try {
        const resumes = await Resume.find({userId: req.user._id}).sort({
            updatedAt: -1
        });
        res.json(resumes);
        
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch resumes', error: error.message});
    }
}


//Get Resume by ID
export const getUserResumeById= async(req,res)=>{
    try{
        const resume=await Resume.findOne({_id:req.params.id, userId:req.user._id});
        if(!resume){
            return res.status(404).json({message:'Resume not found'});
    }
    res.json(resume);
} catch (error) {
    res.status(500).json({message:'Failed to get resume', error:error.message});
}
}


//update resume

export const updateResume= async(req,res)=>{
    try {
        const resume = await Resume.findOne({
            _id:req.params.id,
            userId:req.user._id
        })
        if(!resume){
            return res.status(404).json({message:'Resume not found'});
        }
     //merge  updated resume data
    Object.assign(resume, req.body);

    //save updated resume
    await savedResume.save();
    res.json(savedResume);
  }
    catch (error) {
        res.status(500).json({message:'Failed to update resume', error:error.message});
    }
}

//delete resume
export const deleteResume= async(req,res)=>{
    try {
        const resume = await Resume.findOne({
            _id:req.params.id,
            userId:req.user._id
        })
        if(!resume){
            return res.status(404).json({message:'Resume not found'});
        }
        //create a uploads folder and store the resume there
        const uploadsFolder = path.join(process.cwd(), 'uploads');

        //delete thumbnail function 
        if(resume.thumbnailLink){
            const thumbnailPath = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
            if(fs.existsSync(thumbnailPath)){
                fs.unlinkSync(thumbnailPath);
            }

        }
        if(resume.profileInfo?.profilePreviewUrl){
            const oldProfile=path.join(
                uploadsFolder,
                path.basename(resume.profileInfo.profilePreviewUrl)
            )
            if(fs.existsSync(oldProfile)){
                fs.unlinkSync(oldProfile);
            }
        }

        //delete resume from doc
        const deleted =await Resume.findByIdAndDelete({
            _id: req.params.id,
            userId: req.user._id
        })

        if(!deleted){
            return res.status(404).json({message:'Resume not found or not authorized'});
        }
        await resume.remove();
        res.json({message:'Resume deleted successfully'});
    } catch (error) {
        res.status(500).json({message:'Failed to delete resume', error:error.message});
    }
}    


