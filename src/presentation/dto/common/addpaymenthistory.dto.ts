import { z } from "zod";
import { PaymentHistoryStatus } from "../../../infrastructure/@types/enums/PaymentHistoryStatus";
import { PaymentType } from "../../../infrastructure/@types/enums/PaymentType";

export const addPaymentHistoryDto = z.object({
  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .positive("Amount must be greater than zero"),

  userId: z
    .string({
      required_error: "User ID is required",
    })
    .regex(/^[0-9a-f]{24}$/, { message: "Invalid user ID" }),

  status: z.nativeEnum(PaymentHistoryStatus, {
    required_error: "Status is required",
    invalid_type_error: "Invalid payment status",
  }),
  type: z.nativeEnum(PaymentType, {
    required_error: "Type is required",
    invalid_type_error: "Invalid payment type",
  }),

  paymentId: z
    .string({
      required_error: "Payment ID is required",
    })
    .min(1, "Payment ID cannot be empty"),

  category: z
    .string({
      required_error: "Category is required",
    })
    .min(1, "Category cannot be empty"),

  transactionDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{6}$/, {
      message:
        "Invalid transaction date format. Expected YYYY-MM-DD HH:mm:ss.SSSSSS (with 6 digits for microseconds)",
    }),
});
