import { Router } from "express";
import { getAllConsultation,getSingleConsultation, createConsultation } from "../controllers/consultation.controller";

const router: Router = Router();

// Consultation
router.get("/", getAllConsultation);
router.get("/:id", getSingleConsultation);
router.post("/", createConsultation);


export default router;