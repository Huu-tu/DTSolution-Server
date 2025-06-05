import { Router } from "express";
import { getAllBlog,getSingleBlog, createBlog } from "../controllers/blog.controller";
import ImgUpload from '../middlewares/fileUpload';

const router: Router = Router();

// Blogs
router.get("/", getAllBlog);
router.get("/:id", getSingleBlog);
router.post("/", ImgUpload.single('image'), createBlog);


export default router;