import { Router } from "express";
import { getAllSolution,getSingleSolution, createSolution } from "../controllers/solution.controller";
import ImgUpload from '../middlewares/fileUpload';

const router: Router = Router();

// Solutions
router.get("/", getAllSolution);
router.get("/:id", getSingleSolution);
router.post("/", ImgUpload.single('image'), createSolution);

export default router;