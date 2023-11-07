import express, { type Request, type Response } from "express";
import dotenv from "dotenv";

import type {
  User,
  HttpResponseInvalidSubscriber,
  HttpResponseInvalidEmail,
  HttpResponseValidDryRun,
  HttpResponseValidSubscriber,
  ZodFieldErrors,
} from "../types";
import { subscriberFormSchema } from "../validation/schemas/subscriberForm.client";

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

const users: Record<string, User> = {}; // pretend this is a database

app.post("/api/subscribers", (req: Request, res: Response) => {
  const user: User = req.body;
  const isDryRun = req.headers["x-dry-run"] === "true"; // to check if we just want to validate the form

  const validation = subscriberFormSchema.safeParse(user);

  if (validation.success) {
    const isNewUser = users[user.email] === undefined; // fake database check
    if (!isNewUser) {
      const fieldErrors: ZodFieldErrors = {
        email: ["Email is already subscribed"],
      };
      res.status(412).json({ fieldErrors } as HttpResponseInvalidEmail);
    } else if (isDryRun) {
      res.status(200).json({} as HttpResponseValidDryRun);
    } else {
      users[user.email] = user; // pretend this is a database write
      res.status(201).json({
        user,
        message: "User subscribed successfully",
      } as HttpResponseValidSubscriber);
    }
  } else {
    const fieldErrors = validation.error.flatten().fieldErrors;
    res.status(412).json({ fieldErrors } as HttpResponseInvalidSubscriber);
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
