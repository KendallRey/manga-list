import { z } from "zod";
import { MODEL } from "./model";

export const BaseModel = z.object({
  [MODEL.BASE.ID]: z.string(),
});

const MESSAGE = {
  REQUIRED: "This field is required",
};

export const idField = z.number();
export const idFieldOptional = z.number().nullable().optional();

export const numberField = z.number();
export const stringField = z.string();
export const booleanField = z.boolean();

export const numberFieldRequired = z.number({ error: MESSAGE.REQUIRED });
export const stringFieldRequired = z.string({ error: MESSAGE.REQUIRED }).min(1, { error: MESSAGE.REQUIRED });
export const booleanFieldRequired = z.boolean({ error: MESSAGE.REQUIRED });
