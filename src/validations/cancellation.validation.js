import { z } from 'zod';

export const cancelTableSchema = z.object({
  reason: z.string().min(1, "Please select a reason"),
  remarks: z.string().optional()
}).superRefine((data, ctx) => {
  if (data.reason === "Other" && (!data.remarks || data.remarks.trim() === "")) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Remarks are required when 'Other' is selected",
      path: ["remarks"]
    });
  }
});
