import { keepPreviousData, queryOptions } from "@tanstack/react-query";

import { GetAllCategoriesSchemaInput } from "./products.schema";
import { getAllCategoriesFn } from "./server/functions/categories";

export const allCategoriesOptions = ({
  values,
}: {
  values: GetAllCategoriesSchemaInput;
}) =>
  queryOptions({
    queryKey: ["categories", values],
    queryFn: () => getAllCategoriesFn({ data: values }),
    placeholderData: keepPreviousData,
  });
