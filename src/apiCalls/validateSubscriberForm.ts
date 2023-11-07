import type { User, ValidateSubscriberFormResponse } from "../types";

const validateSubscriberForm = async (user: User) => {
  const res = await fetch("/api/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Dry-Run": "true",
    },
    body: JSON.stringify(user),
  });

  const response: Promise<ValidateSubscriberFormResponse> = res.json();
  return response;
};

export default validateSubscriberForm;
