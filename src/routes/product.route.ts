import { Router } from "express";
import { getAllProduct,getSingleProduct, createProduct } from "../controllers/product.controller";
import ImgUpload from '../middlewares/fileUpload';

const router: Router = Router();

// Product
router.get("/", getAllProduct);
router.get("/:id", getSingleProduct);
router.post("/", ImgUpload.single('image'), createProduct);


export default router;