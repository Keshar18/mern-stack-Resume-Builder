import resume from '../models/resumeModel.js';


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



