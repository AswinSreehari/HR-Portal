import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { connectDB } from './config/db';
import candidateRoute from './routes/candidateRoute';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app: Express = express();
// const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use("/uploads/resumes", express.static(path.join(__dirname, "./uploads/resumes")));

app.use('/api/candidates', candidateRoute);

// Basic route for testing
app.get('/', (_req: Request, res: Response) => {
   
  res.send('HR Careers Portal API is running on Vercel 🚀');
});

// Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

export default app;
