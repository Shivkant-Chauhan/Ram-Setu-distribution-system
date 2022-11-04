import studentRegistrationController from "../controllers/studentRegistrationController.js";
import express from 'express';
import checkUserAuth from "../middleware/auth-middleware.js";
const router = express.Router();


// middleware to protect route
// router.use("/middleware", checkUserAuth);
// router.get("/studentDetails", checkUserAuth);

// Public Routes
router.post("/register", studentRegistrationController.studentRegistration);
router.post("/signin", studentRegistrationController.studentLogin);

// Protected Routes
router.get("/studentDetails", studentRegistrationController.loggedUserDetails);
router.post("/auth_middleware", checkUserAuth);

export default router;