import adminController from "../controllers/adminController.js";
import express from 'express';
import adminAuth from "../middleware/admin-auth.js";
const router = express.Router();


router.post("/register", adminController.adminRegistration);
router.post("/signin", adminController.adminLogin);

// Protected
router.get("/adminDetails", adminController.adminDetails);
router.post("/auth_middleware", adminAuth);

export default router;