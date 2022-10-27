import studentRegistrationController from "../controllers/studentRegistrationController.js";
import express from 'express';
import checkUserAuth from "../middleware/auth-middleware.js";
const router = express.Router();


// Public Routes
router.post("/register", studentRegistrationController.studentRegistration);
router.post("/signin", studentRegistrationController.studentLogin);

// Protected Routes
router.post("/middleware", checkUserAuth);

export default router;