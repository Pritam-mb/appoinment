import express from "express";
import { registeruser, login } from "../controllers/auth.controllers.js";

const router = express.Router();

// Test route
router.get('/test', (req, res) => {
    res.json({ 
        message: 'Auth routes working!', 
        timestamp: new Date() 
    });
});

// Register route
router.post('/register', registeruser);

// Login route
router.post('/login', login);

export default router;