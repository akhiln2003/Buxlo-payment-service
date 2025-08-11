import { z } from "zod";

export const createCheckoutSessionParamsDto = z.object({
  userId: z.string().refine(
    (id) => {
      return /^[0-9a-f]{24}$/.test(id);
    },
    {
      message: "Invalid user ID from the client",
    }
  ),
  type: z.enum(["booking", "subscription"]),
});

export const createCheckoutSessionBodyDto = z.object({
  mentorId: z.string().refine((id) => /^[0-9a-f]{24}$/.test(id), {
    message: "Invalid mentor ID",
  }),
  name: z.string().min(1, "Name is required"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  description: z.string().optional(),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "Invalid start time format. Use HH:MM",
  }),
  duration: z
    .number()
    .int()
    .positive()
    .refine((val) => [15, 30, 45, 60, 75, 90].includes(val), {
      message: "Duration must be one of the allowed values",
    }),
  salary: z.number().min(0, "Salary must be a non-negative number"),
  status: z.enum(["available", "booked", "cancelled", "pending", "failed"]),
  isBooked: z.boolean(),
});
