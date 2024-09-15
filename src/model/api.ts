import { z } from "zod";

export const ApiErrorSchema = z.object({
  status: z.number().optional().nullable(),
  message: z.string().optional().nullable(),
  hint: z.string().optional().nullable(),
  detail: z.string().optional().nullable(),
  error: z.record(z.any()).optional().nullable(),
});

export type IErrorResponse = z.infer<typeof ApiErrorSchema>;