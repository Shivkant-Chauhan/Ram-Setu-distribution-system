import adminController from "../controllers/adminController.js";
import express from 'express';
const router = express.Router();


router.post("/register", adminController.adminRegistration);
router.post("/signin", adminController.adminLogin);

// module.exports.router = router;
export default router;