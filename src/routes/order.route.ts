import { Router } from "express";
import {getAllOrder, orderComplete, orderProduct} from "../controllers/order.controller";

const router: Router = Router();

// Order
router.get("/", getAllOrder);
router.post("/", orderProduct);
router.put("/:id/complete", orderComplete);


export default router;