import { z } from "zod";

export const ZodNumberUndefined = z.number().or(z.undefined()).default(undefined);