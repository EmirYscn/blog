import express, { Application, NextFunction, Request, Response } from "express";

import dotenv from "dotenv";
import path from "node:path";
import cors from "cors";

import { router as userRouter } from "./routes/userRoutes";

dotenv.config({ path: "./.env" });

const app: Application = express();

// app middleware to use form body in post router
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/v1/users", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: "fail",
    data: {
      message: "this route is not defined",
    },
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
