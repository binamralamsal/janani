import { CheckedState } from "@radix-ui/react-checkbox";

import { useEffect, useId, useState } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi, useNavigate } from "@tanstack/react-router";

import { allCategoriesOptions } from "../products.queries";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

const routeAPI = getRouteApi("/_main/products");

export function CategoriesFilter() {
  const id = useId();
  const searchParams = routeAPI.useSearch();

  const navigate = useNavigate();

  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.categories,
  );
  const {
    data: { categories },
  } = useSuspenseQuery(
    allCategoriesOptions({ values: { page: 1, pageSize: 20 } }),
  );

  useEffect(() => {
    setSelectedCategories(searchParams.categories);
  }, [searchParams.categories]);

  function updateURLWithCategories(updatedCategories: string[]) {
    navigate({
      to: "/products",
      search: { ...searchParams, categories: updatedCategories },
      resetScroll: false,
    });
  }

  function handleCategoryToggle(categorySlug: string, isChecked: CheckedState) {
    if (typeof isChecked !== "boolean") return;

    const updatedCategories = isChecked
      ? [...selectedCategories, categorySlug]
      : selectedCategories.filter((slug) => slug !== categorySlug);

    setSelectedCategories(updatedCategories);
    updateURLWithCategories(updatedCategories);
  }

  function handleAllProductsToggle(isChecked: CheckedState) {
    if (isChecked !== true) return;

    setSelectedCategories([]);
    updateURLWithCategories([]);
  }

  return (
    <AccordionItem value="category">
      <AccordionTrigger>Category</AccordionTrigger>
      <AccordionContent>
        <ul>
          <li>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`${id}-all`}
                checked={selectedCategories.length === 0}
                onCheckedChange={handleAllProductsToggle}
              />
              <label
                htmlFor={`${id}-all`}
                className="w-full py-2 text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                All Products
              </label>
            </div>
          </li>

          {categories.map(({ id, name, slug }) => (
            <li key={id}>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`${id}-${slug}`}
                  checked={selectedCategories.includes(slug)}
                  onCheckedChange={(isChecked) =>
                    handleCategoryToggle(slug, isChecked)
                  }
                />
                <label
                  htmlFor={`${id}-${slug}`}
                  className="w-full py-2 text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {name}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
}
