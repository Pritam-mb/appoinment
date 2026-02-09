import express from "express";
const router = express.Router();

// Test route
router.get('/test', (req, res) => {
    res.json({ 
        message: 'Auth routes working!', 
        timestamp: new Date() 
    });
});

// Register route (placeholder)
router.post('/register', (req, res) => {
    res.json({ 
        message: 'Register endpoint created', 
        received: req.body 
    });
});

// Login route (placeholder)
router.post('/login', (req, res) => {
    res.json({ 
        message: 'Login endpoint created', 
        received: req.body 
    });
});

export default router;