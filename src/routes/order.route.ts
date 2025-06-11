import { Router } from "express";
import {getAllOrder, orderComplete, OrderProduct} from "../controllers/order.controller";

const router: Router = Router();

// Order
router.get("/", getAllOrder);
router.post("/", OrderProduct);
router.put("/:id/complete", orderComplete);


export default router;