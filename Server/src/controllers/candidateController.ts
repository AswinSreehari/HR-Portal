import { Request, Response } from "express";
import InterviewModel from "../models/interview";
import { sendInterviewEmail } from "../Services/sendEmail";
import CandidateModel from "../models/candidates";  
const BASEURL = `http://localhost:${process.env.PORT || 5000}`;
 
 
export const scheduleInterview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { candidateEmail, candidateName, date, time, location, interviewer, meetingLink } = req.body;

    if (!candidateEmail || !candidateName || !date || !time || !location || !interviewer || !meetingLink) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    // Save interview details to MongoDB
    const interview = new InterviewModel({
      candidateEmail,
      candidateName,
      date,
      time,
      location,
      interviewer,
      meetingLink,
    });

    await interview.save();

    // Send email notification
    await sendInterviewEmail(interview);

    res.status(201).json({ message: "Interview scheduled and email sent!" });
  } catch (error) {
    console.error("Error scheduling interview:", error);
    res.status(500).json({ message: "Failed to schedule interview" });
  }
};

 
export const addCandidate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { jobId, name, email, experience, skills } = req.body;

    if (!jobId || !name || !email || !experience || !skills) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    if (!req.file) {
      res.status(400).json({ message: "Resume file is required" });
      return;
    }
    // const jobIdObjectId =  mongoose.Types.ObjectId.createFromHexString(jobId);
    const newCandidate = new CandidateModel({
      jobId,
      name,
      email,
      experience: parseInt(experience, 10),
      skills: Array.isArray(skills) ? skills : skills.split(",").map((s: string) => s.trim()), 
      resumePath: `${BASEURL}/uploads/resumes/${req.file.filename}`,   
    });

    await newCandidate.save();
    const Candidates = await CandidateModel.find();
    res.status(201).json({ message: "Candidate added successfully", candidates: Candidates });
  } catch (error) {
    console.error("Error adding candidate:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

 
export const getCandidates = async (_req: Request, res: Response): Promise<void> => {
  try {
    const candidatesData = await CandidateModel.find();
    res.status(200).json({Message:"Candidate data fetched successfully",candidates: candidatesData});
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
