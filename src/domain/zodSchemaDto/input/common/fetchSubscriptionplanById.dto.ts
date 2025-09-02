import { z } from "zod";

export const fetchSubscriptionplanByIdDto = z.object({
  id: z.string().min(1, { message: "Subscription ID is required" }),
});
