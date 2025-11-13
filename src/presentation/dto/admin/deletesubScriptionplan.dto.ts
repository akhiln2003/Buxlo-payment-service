import { z } from "zod";

export const deleteSubscriptionPlanDto = z.object({
  id: z
    .string()
    .uuid({ message: "Invalid subscription ID format (must be UUID)" }),
});
