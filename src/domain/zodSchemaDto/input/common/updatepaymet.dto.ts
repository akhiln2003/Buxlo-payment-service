import { z } from "zod";

export const updatePaymentDto = z.object({
  id: z.string().min(1, { message: "Session ID is required" }),
});
