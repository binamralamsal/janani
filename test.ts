import { ZodEffects, ZodSchema, z } from "zod";

export function coerceToNumberSchema<T extends ZodSchema>(toSchema: T) {
  return z.preprocess((val) => {
    if (typeof val === "string" && !isNaN(+val)) {
      if (!val.trim()) return undefined;
      return +val;
    }
    return val;
  }, toSchema) as ZodEffects<T, z.infer<T>, z.input<T> | string>;
}

const priceSchema = coerceToNumberSchema(
  z
    .number({
      invalid_type_error: "Sale Price must only include numbers or decimal.",
    })
    .optional()
    .nullable()
    .default(null),
);

console.log(priceSchema.parse("a"));
