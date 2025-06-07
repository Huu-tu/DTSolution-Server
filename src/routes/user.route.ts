import { Router } from "express";
import { signin, signup } from "../controllers/user.controller";

const router: Router = Router();

// User
router.post("/signin", signin);
router.post("/signup", signup);

export default router;