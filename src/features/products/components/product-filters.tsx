import { useEffect, useState } from "react";

import { getRouteApi, useNavigate } from "@tanstack/react-router";

import { Accordion } from "@/components/ui/accordion";

import { CategoriesFilter } from "@/features/products/components/categories-filter";
import { PriceRangeFilter } from "@/features/products/components/price-range-filter";

const routeAPI = getRouteApi("/_main/products");

export function ProductsFilters() {
  const searchParams = routeAPI.useSearch();
  const [openedAccordions, setOpenedAccordions] = useState(
    searchParams.accordion,
  );
  const navigate = useNavigate();

  useEffect(() => {
    setOpenedAccordions(searchParams.accordion);
  }, [searchParams.accordion]);

  const handleChange = (newOpenItems: string[]) => {
    setOpenedAccordions(newOpenItems as ("category" | "price")[]);

    navigate({
      to: "/products",
      search: { ...searchParams, accordion: newOpenItems },
      resetScroll: false,
    });
  };

  return (
    <Accordion
      type="multiple"
      value={openedAccordions}
      onValueChange={handleChange}
    >
      <CategoriesFilter />
      <PriceRangeFilter />
    </Accordion>
  );
}
