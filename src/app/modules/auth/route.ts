import { Router } from "express";
import { authController } from "./controller";

const router = Router();

router.post("/login", authController.login);

export const authRouter = router;
