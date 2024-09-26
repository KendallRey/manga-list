import { z } from "zod";
import { ZOD } from "../constants/validation";

export const LoginFormSchema = z.object({
  email: z.string({ message: ZOD.ERROR.REQUIRED }).min(3).email(ZOD.ERROR.NOT_EMAIL),
  password: z.string({ message: ZOD.ERROR.REQUIRED }).min(3),
});
export type ILoginFormSchema = z.infer<typeof LoginFormSchema>;
