import express from "express";
import cors from "cors";
import { router } from "./app/route";
import { globalErrorHandler } from "./app/error/globalErrorHandler";
import { notFound } from "./app/error/notFound";
export const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1", router);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(notFound);
app.use(globalErrorHandler);
