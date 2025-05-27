import { Router } from "express";
import { getAllBlog } from "../controllers/blog.controller";

const router: Router = Router();

// Get all blogs
router.get("/", getAllBlog);

export default router;