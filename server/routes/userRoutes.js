import studentRegistrationController from "../controllers/studentRegistrationController.js";
import express from 'express';
const router = express.Router();


router.post("/register", studentRegistrationController.studentRegistration);
router.post("/signin", studentRegistrationController.studentLogin);

// module.exports.router = router;
export default router;