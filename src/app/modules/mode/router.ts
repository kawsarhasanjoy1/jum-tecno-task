import { Router } from "express";
import { moodController } from "./controller";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../users/user.constance";

const router = Router();
router.post(
  "/create-mood",
  auth(USER_ROLE.admin, USER_ROLE.user),
  moodController.createMood
);
router.get("/", auth(USER_ROLE.admin, USER_ROLE.user), moodController.getMoods);
router.put(
  "/moods/:id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  moodController.updateMood
);
router.delete("/moods/:id", auth(USER_ROLE.admin, USER_ROLE.user), moodController.softDeleteMood);
router.patch("/moods/:id/restore", moodController.restoreMood);
// router.get('/summary/week', auth(USER_ROLE.admin,USER_ROLE.user), moodController.getWeeklySummary);

export const moodRouter = router;
