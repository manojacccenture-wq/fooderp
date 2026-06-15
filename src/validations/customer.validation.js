import { z } from 'zod';

export const startOrderSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  customerMobile: z.string().regex(/^[0-9]{10}$/, "Enter valid 10 digit mobile number"),
  customerAddress: z.string().min(1, "Customer address is required").default("N/A"),
  covers: z.coerce.number().min(0, "Guests cannot be negative").optional()
});
