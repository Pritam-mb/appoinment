import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import ratelimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", // Adjust this to your frontend URL
}))
app.use(cookieParser());
app.use(ratelimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
}));

// Routes
app.use('/api/auth', authRoutes);

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ 
        message: 'AI Booking Server is running!', 
        timestamp: new Date(),
        status: 'healthy' 
    });
});
export default app;