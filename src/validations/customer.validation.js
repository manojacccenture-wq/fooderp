import { z } from 'zod';

export const startOrderSchema = z.object({
  name: z.string().min(2, "Name is required"),
  guests: z.coerce.number().min(1, "Guests must be at least 1").max(50, "Guests must be at most 50"),
  reserve: z.enum(["yes", "no"], { errorMap: () => ({ message: "Reserve type is required" }) }),
  time: z.string().min(1, "Time is required"),
  mobile: z.string().regex(/^[0-9]{10}$/, "Mobile number must contain 10 digits")
});
