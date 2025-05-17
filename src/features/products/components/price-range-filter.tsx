import { useCallback, useEffect, useMemo } from "react";

import { getRouteApi, useNavigate } from "@tanstack/react-router";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

import { MAX_PRICE_RANGE, MIN_PRICE_RANGE } from "@/config/constants";
import { useSliderWithInput } from "@/hooks/use-slider-with-input";

function debounce<T extends (...args: Parameters<T>) => void>(
  func: T,
  delay: number,
) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

const routeAPI = getRouteApi("/_main/products");

export function PriceRangeFilter() {
  const searchParams = routeAPI.useSearch();

  const initialValue = useMemo(() => [MIN_PRICE_RANGE, MAX_PRICE_RANGE], []);
  const navigate = useNavigate();

  const getPriceRangeFromURL = useCallback(() => {
    const urlPriceRange = searchParams.priceRange;
    if (!urlPriceRange || urlPriceRange.length !== 2) return initialValue;

    const [min, max] = urlPriceRange;
    return [
      Math.max(MIN_PRICE_RANGE, min || MIN_PRICE_RANGE),
      Math.min(MAX_PRICE_RANGE, max || MAX_PRICE_RANGE),
    ];
  }, [initialValue, searchParams]);

  const {
    sliderValue,
    inputValues,
    validateAndUpdateValue,
    handleInputChange,
    handleSliderChange,
  } = useSliderWithInput({
    minValue: MIN_PRICE_RANGE,
    maxValue: MAX_PRICE_RANGE,
    initialValue: getPriceRangeFromURL(),
  });

  const updateURLWithPriceRange = useCallback(
    (updatedPriceRange: number[]) => {
      if (updatedPriceRange.length !== 2) return;

      navigate({
        to: "/products",
        search: { ...searchParams, priceRange: updatedPriceRange },
        resetScroll: false,
      });
    },
    [searchParams],
  );

  const debouncedUpdateURLWithPriceRange = useMemo(
    () => debounce(updateURLWithPriceRange, 500),
    [updateURLWithPriceRange],
  );

  useEffect(() => {
    handleSliderChange(getPriceRangeFromURL());
  }, [getPriceRangeFromURL, handleSliderChange]);

  const handleSliderChangeWithURLUpdate = (newValue: number[]) => {
    handleSliderChange(newValue);
    debouncedUpdateURLWithPriceRange(newValue);
  };

  const handleInputBlurWithURLUpdate = (value: string, index: number) => {
    validateAndUpdateValue(value, index);
    debouncedUpdateURLWithPriceRange(sliderValue);
  };

  return (
    <AccordionItem value="price">
      <AccordionTrigger>Price</AccordionTrigger>
      <AccordionContent>
        <div className="py-2">
          <Slider
            className="grow"
            value={sliderValue}
            onValueChange={handleSliderChangeWithURLUpdate}
            min={MIN_PRICE_RANGE}
            max={MAX_PRICE_RANGE}
          />
        </div>
        <div className="mt-4 flex items-center gap-4 px-1">
          <Input
            className="h-8 px-2 py-1"
            type="text"
            inputMode="decimal"
            value={inputValues[0]}
            onChange={(e) => handleInputChange(e, 0)}
            onBlur={() => handleInputBlurWithURLUpdate(inputValues[0], 0)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleInputBlurWithURLUpdate(inputValues[0], 0);
              }
            }}
            aria-label="Enter minimum price"
          />

          <Input
            className="h-8 px-2 py-1"
            type="text"
            inputMode="decimal"
            value={inputValues[1]}
            onChange={(e) => handleInputChange(e, 1)}
            onBlur={() => handleInputBlurWithURLUpdate(inputValues[1], 1)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleInputBlurWithURLUpdate(inputValues[1], 1);
              }
            }}
            aria-label="Enter maximum price"
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
