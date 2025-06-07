import { Router } from "express";
import { getAllService,getSingleService, createService } from "../controllers/service.controller";
import ImgUpload from '../middlewares/fileUpload';

const router: Router = Router();

// Services
router.get("/", getAllService);
router.get("/:id", getSingleService);
router.post("/", ImgUpload.single('image'), createService);

export default router;