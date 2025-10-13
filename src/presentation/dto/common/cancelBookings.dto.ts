import { z } from "zod";

export const cancelBookingsDto = z.object({
  id: z
    .string()
    .uuid({ message: "Invalid user ID: must be a valid UUID format" }),
});
