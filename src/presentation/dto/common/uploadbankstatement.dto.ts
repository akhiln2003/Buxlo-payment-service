import { z } from "zod";

export const uploadbankstatementDto = z.object({
  userId: z.string().refine(
    (id) => {
      return /^[0-9a-f]{24}$/.test(id);
    },
    {
      message: "Invalid user ID from the client",
    }
  ),
});
