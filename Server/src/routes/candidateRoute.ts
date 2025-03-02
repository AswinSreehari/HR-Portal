import express from "express";
import { addCandidate, getCandidates, scheduleInterview } from "../controllers/candidateController";
import upload from "../middleware/multer";

const router = express.Router();

router.post("/schedule-interview", scheduleInterview);
router.post("/add", upload.single("resume"), addCandidate);
router.get("/getCandidates",getCandidates);


export default router;
