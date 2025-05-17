"use client";

import { X } from "lucide-react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";

import { allCategoriesOptions, allProductsOptions } from "../products.queries";

import { Button } from "@/components/ui/button";

type Category = {
  id: number;
  name: string;
  slug: string;
};

type Size = {
  id: number;
  name: string;
  slug: string;
};

type Color = {
  id: number;
  name: string;
  color: string;
  slug: string;
};

const routeAPI = getRouteApi("/_main/products");

export function ProductsFiltersHeader() {
  const searchParams = routeAPI.useSearch();
  const navigate = routeAPI.useNavigate();

  const {
    data: { products },
  } = useSuspenseQuery(
    allProductsOptions({
      values: {
        categories: searchParams.categories,
        priceRange: searchParams.priceRange,
        status: ["published"],
      },
    }),
  );
  const {
    data: { categories },
  } = useSuspenseQuery(
    allCategoriesOptions({ values: { page: 1, pageSize: 20 } }),
  );

  const appliedCategories = searchParams.categories;
  const appliedPrice = searchParams.priceRange;

  const hasFilters = appliedCategories.length > 0 || appliedPrice;

  function getNameFromSlug(
    slug: string,
    items: Array<Category | Size | Color>,
  ) {
    return items.find((item) => item.slug === slug)?.name || slug;
  }

  function removeFilter(type: "categories" | "priceRange", value?: string) {
    const params = { ...searchParams };

    if (value) {
      const values = (params[type] || []).filter((v) => v !== value);
      if (values.length) {
        //@ts-expect-error -- Types won't matter as it depends on the type
        params[type] = values;
      } else {
        delete params[type];
      }
    } else {
      delete params[type];
    }

    navigate({
      to: ".",
      search: params,
      resetScroll: false,
    });
  }

  function clearAllFilters() {
    navigate({ to: ".", search: {}, resetScroll: false });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold md:text-3xl">
          {products.length} Product{products.length > 1 ? "s" : ""}
        </h2>
        {hasFilters && (
          <Button variant="outline" size="sm" onClick={clearAllFilters}>
            Clear all filters
          </Button>
        )}
      </div>

      {hasFilters && (
        <div className="flex flex-wrap gap-2">
          {appliedCategories.map((slug) => (
            <Button
              key={`category-${slug}`}
              variant="secondary"
              size="sm"
              onClick={() => removeFilter("categories", slug)}
              className="group gap-1"
            >
              {getNameFromSlug(slug, categories)}
              <X className="h-4 w-4" />
            </Button>
          ))}

          {appliedPrice && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => removeFilter("priceRange")}
              className="group gap-1"
            >
              Price: Rs. ${appliedPrice[0]} - Rs. ${appliedPrice[1]}
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
