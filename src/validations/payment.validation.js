import { z } from 'zod';

export const paymentCheckoutSchema = z.object({
  customerPaidAmount: z.coerce.number().min(0, "Amount cannot be negative"),
  customTip: z.string().refine(val => val === '' || Number(val) >= 0, "Tip must be positive").optional(),
  dueCustomerName: z.string().min(2, "Customer name is required").optional(),
  dueMobileNumber: z.string().regex(/^[0-9]{10}$/, "Enter valid 10 digit phone number").optional(),
  dueGivenAmount: z.coerce.number().min(0, "Amount cannot be negative").optional(),
  dueAmount: z.coerce.number().min(0, "Amount cannot be negative").optional(),
  dueDate: z.string().optional(),
  dueReason: z.string().optional(),
});
