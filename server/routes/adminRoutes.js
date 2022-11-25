import adminController from "../controllers/adminController.js";
import express from 'express';
import adminAuth from "../middleware/admin-auth.js";
const router = express.Router();


router.post("/register", adminController.adminRegistration);
router.post("/signin", adminController.adminLogin);

// Protected
router.get("/adminDetails", adminController.adminDetails);
router.post("/auth_middleware", adminAuth);
router.post("/delete_record", adminController.delete_records);
router.post("/lock_record", adminController.lock_records);
router.post("/unlock_record", adminController.unlock_records);
router.get("/feedback", adminController.userFeedback);
router.post("/issueResolved", adminController.issueResolved);

export default router;