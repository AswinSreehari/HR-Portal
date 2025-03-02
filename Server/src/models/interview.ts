import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator

const InterviewSchema = new mongoose.Schema(
  {
    interviewId: { 
      type: String, 
      default: uuidv4, // Automatically generate a unique ID
      unique: true 
    },
    candidateEmail: { type: String, required: true },
    candidateName: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    interviewer: { type: String, required: true },
    meetingLink: { type: String, required: true },
    interviewType: { 
      type: String, 
      required: true,
    //   enum: ["Technical", "HR", "Managerial", "Other"],  
    },
  },
  { timestamps: true }
);

const Interview = mongoose.model("Interview", InterviewSchema);
export default Interview;
