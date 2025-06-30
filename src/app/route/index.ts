import { Router } from "express";
import { userRouter } from "../modules/users/route";
import { authRouter } from "../modules/auth/route";
import { moodRouter } from "../modules/mode/router";


export const router = Router();

const routerPath = [
  {
    path: "/users",
    element: userRouter,
  },
  {
    path: "/auth",
    element: authRouter,
  },
  {
    path: "/moods",
    element: moodRouter,
  },
];

routerPath.map((route) => router.use(route.path, route.element));
