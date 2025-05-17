import { z } from "zod";

import { DATATABLE_PAGE_SIZE } from "@/config/constants";
import { coerceToNumberSchema } from "@/util/zod-coerce-to-number-schema";

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Category name must be at least 2 characters long." })
    .max(50, { message: "Category name must be less than 50 characters long." })
    .regex(/^[a-zA-Z\s]*$/, {
      message: "Category name can only contain letters and spaces.",
    }),
  slug: z
    .string()
    .trim()
    .min(2, { message: "Slug must be at least 2 characters long." })
    .max(50, { message: "Slug must be less than 50 characters long." })
    .regex(/^[a-z0-9-]+$/, {
      message:
        "Slug can only contain lowercase letters, numbers, and hyphens. Spaces are not allowed.",
    }),
});
export type CategorySchema = z.infer<typeof categorySchema>;

export const getAllCategoriesSchema = z.object({
  page: z.number().int().min(1).optional().default(1).catch(1),
  pageSize: z
    .number()
    .int()
    .min(5)
    .optional()
    .default(DATATABLE_PAGE_SIZE)
    .catch(DATATABLE_PAGE_SIZE),
  search: z.string().optional(),
  sort: z
    .record(
      z.enum(["id", "name", "slug", "createdAt", "updatedAt"]),
      z.enum(["asc", "desc"]),
    )
    .optional()
    .default({ createdAt: "desc" })
    .catch({ createdAt: "desc" }),
});
export type GetAllCategoriesSchema = z.infer<typeof getAllCategoriesSchema>;
export type GetAllCategoriesSchemaInput = z.input<
  typeof getAllCategoriesSchema
>;

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Product name must be at least 3 characters long.")
    .max(255, "Product name must be 255 characters or fewer.")
    .describe("The name of the product."),
  slug: z
    .string()
    .trim()
    .min(2, { message: "Slug must be at least 2 characters long." })
    .max(50, { message: "Slug must be less than 300 characters long." })
    .regex(/^[a-z0-9-]+$/, {
      message:
        "Slug can only contain lowercase letters, numbers, and hyphens. Spaces are not allowed.",
    }),
  price: coerceToNumberSchema(
    z.number({
      required_error: "Price is required.",
      invalid_type_error: "Price must only include numbers or decimal.",
    }),
  ),
  salePrice: coerceToNumberSchema(
    z
      .number({
        invalid_type_error: "Sale Price must only include numbers or decimal.",
      })
      .optional()
      .nullable()
      .default(null),
  ),
  unit: z.string().min(1, { message: "Unit is required." }),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters long.")
    .max(1000, "Description must be 1000 characters or fewer.")
    .describe("A brief description of the product."),
  status: z
    .enum(["draft", "published", "archived"], {
      errorMap: () => ({
        message: "Status must be 'draft', 'published', or 'archived'.",
      }),
    })
    .default("draft")
    .describe("The current status of the product."),
  categoryId: z
    .number()
    .positive("Category you entered is invalid.")
    .int("Category you entered is invalid.")
    .nullable()
    .default(null)
    .describe("The category this product belongs to."),
  images: z
    .number()
    .positive("Image that you uploaded is invalid.")
    .int("Image that you uploaded is invalid.")
    .array()
    .max(20, { message: "You can't upload more than twenty images." })
    .describe("Images associated with the product."),
});
export type ProductSchema = z.infer<typeof productSchema>;
export type ProductSchemaInput = z.input<typeof productSchema>;
