import { z } from 'zod';

export const menuOrderSchema = z.object({
  phone: z.string().regex(/^[0-9]{10}$/, "Enter valid 10 digit phone number").or(z.literal('')),
  guestCount: z.coerce.number().min(1, "Guest count must be at least 1").optional()
});
