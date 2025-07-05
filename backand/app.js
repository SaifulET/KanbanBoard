// index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './router/api.js';
import cors from "cors"
import cookieParser from "cookie-parser"
dotenv.config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(
  cors({
    // origin: "https://guileless-dodol-f43ebb.netlify.app",
    origin:"http://localhost:5173",  
    credentials: true,             
  })
);
app.use(cookieParser());
app.use("/api",router);


// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});




// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});