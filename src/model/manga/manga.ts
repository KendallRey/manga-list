import { z } from "zod";
import { BaseModel } from "../base";
import { MODEL } from "../model";

export const MangaModel = BaseModel.merge(
  z.object({
    [MODEL.MANGA.NAME]: z.string(),
  }),
);
export type IMangaModel = z.infer<typeof MangaModel>;
