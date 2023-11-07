import z from "zod";
import { subscriberFormSchema } from "./validation/schemas/subscriberForm.client";
export { type SubscriberFormData } from "./validation/schemas/subscriberForm.client";

export type ZodFieldErrors = { [key: string]: string[] | undefined };

export type User = {
  name: string;
  email: string;
  age: number;
  acceptsTerms: boolean;
};

// API types //

// post subscriber http responses
export type HttpResponseInvalidSubscriber = {
  fieldErrors: z.inferFlattenedErrors<
    typeof subscriberFormSchema
  >["fieldErrors"];
};

export type HttpResponseValidSubscriber = {
  user: User;
  message: string;
};

export type HttpResponseValidDryRun = {};

export type HttpResponseInvalidEmail = {
  fieldErrors: { email: string[] };
};

export type PostSubscriberResponse =
  | HttpResponseValidSubscriber
  | HttpResponseInvalidEmail
  | HttpResponseInvalidSubscriber;

export type ValidateSubscriberFormResponse =
  | HttpResponseValidDryRun
  | HttpResponseInvalidEmail
  | HttpResponseInvalidSubscriber;
