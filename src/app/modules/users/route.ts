import { Router } from "express";
import { userController } from "./controller";

const router = Router();
router.post("/register", userController.register);

export const userRouter = router;
