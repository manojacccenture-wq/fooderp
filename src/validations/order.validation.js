import { z } from 'zod';

export const menuOrderSchema = z.object({
  phone: z.string()
    .min(1, "Please enter customer mobile number")
    .regex(/^[0-9]{10}$/, "Enter valid 10 digit phone number"),
  guestCount: z.coerce.number().min(1, "Guest count must be at least 1").optional()
});
