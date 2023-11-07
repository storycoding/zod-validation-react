import { z } from "zod";

export const subscriberFormSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be longer than 2 characters")
      .max(50, "Name must be shorter than 50 characters"),
    email: z.string().email("Please enter a valid email"),
    emailVerification: z.string().email("Please enter a valid email"),
    age: z.number().min(18, "You have to be at least 18 years old"),
    acceptsTerms: z
      .boolean()
      .refine((val) => val === true, { message: "You must accept the terms" }),
  })
  .refine((data) => data.email === data.emailVerification, {
    message: "Emails do not match",
    path: ["emailVerification"],
  });

export type SubscriberFormSchema = typeof subscriberFormSchema;
export type SubscriberFormData = z.infer<SubscriberFormSchema>;

export const defaultSubscriberFormData: SubscriberFormData = {
  name: "Emmet",
  email: "emmet@lego.com",
  emailVerification: "emmet@lego.com",
  age: 33, // todo: how do I make these optional and keep the required error?
  acceptsTerms: true, // todo: how do I make these optional and keep the required error?
};
