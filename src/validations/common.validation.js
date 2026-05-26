import { z } from 'zod';

export const specialInstructionsSchema = z.object({
  additionalNote: z.string().max(200, "Maximum 200 characters allowed").optional()
});

export const applyDiscountSchema = z.object({
  discountValue: z.coerce.number().min(0, "Discount cannot be negative").max(100, "Discount cannot exceed 100%"),
  coupon: z.string().optional(),
  reason: z.string().optional()
});
