import { z } from "zod";
import { MODEL } from "./model";

export const BaseModel = z.object({
  [MODEL.BASE.ID]: z.string(),
});
