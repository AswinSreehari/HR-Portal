import mongoose, { Schema, Document } from "mongoose";

// Define candidate interface
export interface ICandidate extends Document {
  jobId: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  experience: number;
  skills: string[];
  resumePath: string;  
}

// Define schema
const CandidateSchema = new Schema<ICandidate>({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  experience: { type: Number, required: true },
  skills: { type: [String], required: true },
  resumePath: { type: String, required: true }, 
}, { timestamps: true });

export default mongoose.model<ICandidate>("Candidate", CandidateSchema);
