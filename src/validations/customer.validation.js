import { z } from 'zod';

export const startOrderSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  guests: z.coerce.number().min(1, "Guest count required"),
  reserve: z.enum(["yes", "no"], { errorMap: () => ({ message: "Reservation selection required" }) }),
  time: z.string().min(1, "Time is required"),
  mobile: z.string().regex(/^[0-9]{10}$/, "Enter valid 10 digit phone number")
});
