import type { User, PostSubscriberResponse } from "../types";

const postSubscriber = async (user: User) => {
  const res = await fetch("/api/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const response: Promise<PostSubscriberResponse> = res.json();
  return response;
};

export default postSubscriber;
