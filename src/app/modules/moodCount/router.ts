import { Router } from "express";
import { getWeeklySummary } from "./controller";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../users/user.constance";

const router = Router();

router.get(
  "/weekly-summary",
  auth(USER_ROLE.admin, USER_ROLE.user),
  getWeeklySummary
);

export const summaryRouter = router;
