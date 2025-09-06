import z from "zod";
import { booleanFieldRequired, stringFieldRequired } from "./base";

export const TodoFormSchema = z.object({
  title: stringFieldRequired,
  completed: booleanFieldRequired,
});
export type TodoFormSchemaType = z.infer<typeof TodoFormSchema>;
