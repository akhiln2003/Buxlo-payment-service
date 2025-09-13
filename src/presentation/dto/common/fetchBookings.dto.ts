import { z } from "zod";

export const fetchBookingsDto = z.object({
  id: z.string().refine((id) => /^[0-9a-f]{24}$/.test(id), {
    message: "Invalid user ID: must be a 24-character hexadecimal string",
  }),
  page: z
    .string()
    .trim()
    .refine((val) => /^\d+$/.test(val) && Number(val) > 0, {
      message: "Page must be a positive integer",
    }),
});
