import { z } from "zod";
import { PaymentHistoryStatus } from "../../../infrastructure/@types/enums/PaymentHistoryStatus";

export const fetchPaymentHistoryDto = z.object({
  userId: z
    .string()
    .regex(/^[0-9a-f]{24}$/, { message: "Invalid user ID from the client" }),

  page: z
    .string({
      required_error: "Page number is required",
      invalid_type_error: "Page must be a string",
    })
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val >= 1, {
      message: "Page must be a positive integer starting from 1",
    }),

  status: z
    .union([z.literal("all"), z.nativeEnum(PaymentHistoryStatus)])
    .default("all"), 

  searchData: z.string().optional().default(""),
});
