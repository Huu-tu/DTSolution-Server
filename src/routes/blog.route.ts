import { Router } from "express";
import { getAllBlog, createBlog } from "../controllers/blog.controller";
import ImgUpload from '../middlewares/fileUpload';

const router: Router = Router();

// Get all blogs
router.get("/", getAllBlog);
router.post("/", ImgUpload.single('image'), createBlog);

export default router;