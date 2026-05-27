import { z } from 'zod';

export const startOrderSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  guests: z.coerce.number().min(1, "Guest count required"),
  reserve: z.enum(["yes", "no"], { errorMap: () => ({ message: "Reservation selection required" }) }),
  time: z.string().min(1, "Time is required"),
  mobile: z.string()
    .trim()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .regex(/^[0-9]+$/, "Only numbers allowed")
});
